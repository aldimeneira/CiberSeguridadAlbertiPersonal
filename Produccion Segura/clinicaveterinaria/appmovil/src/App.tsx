import { useEffect, useMemo, useState } from 'react'
import { Preferences } from '@capacitor/preferences'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://lfxoxooctugkkpcezjmf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJsb_publishable_4IOxMrU2tQEKny02kmg49Q_x4TxWH-W'
const SESSION_KEY = 'cv-mobile-session'
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api'

type TabId = 'inicio' | 'tienda' | 'adopciones' | 'perfil'

type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
}

type ExclusiveProduct = Product & {
  final_price: number
  discount_applied: number
}

type Pet = {
  id: string
  name: string
  breed: string
  age: number
  description: string
  status: string
}

type AuthSession = {
  accessToken: string
  userEmail: string
}

type OrderResponse = {
  order: {
    id: string
    quantity: number
    unit_price: number
  }
  savings: number
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: true,
  },
})

async function readStoredSession(): Promise<AuthSession | null> {
  const saved = await Preferences.get({ key: SESSION_KEY })
  if (!saved.value) {
    return null
  }

  try {
    const parsed = JSON.parse(saved.value) as AuthSession
    if (!parsed.accessToken || !parsed.userEmail) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

async function saveStoredSession(session: AuthSession) {
  await Preferences.set({ key: SESSION_KEY, value: JSON.stringify(session) })
}

async function clearStoredSession() {
  await Preferences.remove({ key: SESSION_KEY })
}

async function apiRequest<T>(path: string, options: RequestInit = {}, token?: string | null) {
  const headers = new Headers({ 'Content-Type': 'application/json' })

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  if (options.headers) {
    const extraHeaders = new Headers(options.headers)
    extraHeaders.forEach((value, key) => {
      headers.set(key, value)
    })
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })

  const raw = await response.text()
  let data: unknown = null

  if (raw) {
    try {
      data = JSON.parse(raw)
    } catch {
      data = raw
    }
  }

  if (!response.ok) {
    let message = 'Ha ocurrido un error en la API'

    if (typeof data === 'object' && data !== null && 'error' in data) {
      message = String((data as { error?: string }).error)
    } else if (typeof data === 'object' && data !== null && 'errors' in data) {
      message = JSON.stringify((data as { errors?: unknown[] }).errors)
    }

    throw new Error(message)
  }

  return data as T
}

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('inicio')
  const [auth, setAuth] = useState<AuthSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [exclusiveProducts, setExclusiveProducts] = useState<ExclusiveProduct[]>([])
  const [pets, setPets] = useState<Pet[]>([])
  const [busy, setBusy] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    let mounted = true

    async function boot() {
      const stored = await readStoredSession()
      if (!mounted) {
        return
      }

      setAuth(stored)
      setLoading(false)
    }

    boot()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!auth) {
      return
    }

    const session = auth

    async function loadClientData() {
      try {
        const [catalog, exclusive, availablePets] = await Promise.all([
          apiRequest<Product[]>('/store/products', {}, session.accessToken),
          apiRequest<{ products: ExclusiveProduct[]; adopter_benefits: boolean }>('/store/products/exclusive', {}, session.accessToken),
          apiRequest<Pet[]>('/adoptions', {}, session.accessToken),
        ])

        setProducts(catalog)
        setExclusiveProducts(exclusive.products)
        setPets(availablePets)
        setError('')
      } catch (err) {
        const message = err instanceof Error ? err.message : 'No se pudieron cargar los datos'
        if (message.includes('401') || message.includes('Token')) {
          setAuth(null)
          void clearStoredSession()
        }
        setError(message)
      }
    }

    void loadClientData()
  }, [auth])

  const welcomeMessage = useMemo(() => {
    if (!auth?.userEmail) {
      return 'Accede a la tienda y a adopciones desde tu móvil'
    }

    return `Hola ${auth.userEmail}`
  }, [auth])

  async function handleAuth(event: { preventDefault: () => void }) {
    event.preventDefault()

    if (!email || !password) {
      setError('Completa email y contraseña')
      return
    }

    setBusy(true)
    setError('')
    setNotice('')

    try {
      if (isRegistering) {
        if (!fullName) {
          throw new Error('Añade tu nombre completo')
        }

        const registerResponse = await fetch(`${API_BASE}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            full_name: fullName,
            role: 'cliente',
          }),
        })

        const registerData = await registerResponse.json().catch(() => ({}))

        if (!registerResponse.ok) {
          throw new Error(registerData.error || 'No se pudo registrar el usuario')
        }
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

      if (signInError || !data.session) {
        throw new Error(signInError?.message || 'No se pudo iniciar sesión')
      }

      const session = {
        accessToken: data.session.access_token,
        userEmail: data.user.email || email,
      }

      await saveStoredSession(session)
      setAuth(session)
      setNotice(isRegistering ? 'Registro completado. Ya puedes usar la app.' : 'Sesión iniciada correctamente')
      setFullName('')
      setPassword('')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudo completar la autenticación'
      setError(message)
    } finally {
      setBusy(false)
    }
  }

  async function handleLogout() {
    setBusy(true)
    setError('')
    setNotice('')

    try {
      await supabase.auth.signOut()
      await clearStoredSession()
      setAuth(null)
      setProducts([])
      setExclusiveProducts([])
      setPets([])
      setActiveTab('inicio')
      setNotice('Sesión cerrada con seguridad')
    } catch {
      setError('No se pudo cerrar la sesión')
    } finally {
      setBusy(false)
    }
  }

  async function handleAdoptPet(petId: string) {
    if (!auth) {
      setError('Inicia sesión para adoptar')
      return
    }

    setBusy(true)
    setError('')
    setNotice('')

    try {
      const result = await apiRequest<{ adoption: unknown; message: string }>('/adoptions', {
        method: 'POST',
        body: JSON.stringify({ pet_id: petId }),
      }, auth.accessToken)

      setNotice(result.message)
      setPets((current) => current.filter((pet) => pet.id !== petId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo completar la adopción')
    } finally {
      setBusy(false)
    }
  }

  async function handleOrder(productId: string, quantity = 1) {
    if (!auth) {
      setError('Inicia sesión para comprar')
      return
    }

    setBusy(true)
    setError('')
    setNotice('')

    try {
      const result = await apiRequest<OrderResponse>('/store/order', {
        method: 'POST',
        body: JSON.stringify({ product_id: productId, quantity }),
      }, auth.accessToken)

      setNotice(`Pedido creado. Ahorraste ${result.savings.toFixed(2)}€`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear el pedido')
    } finally {
      setBusy(false)
    }
  }

  if (loading) {
    return (
      <main className="container shell">
        <div className="card loading-card">
          <p className="eyebrow">Clínica Veterinaria</p>
          <h1>Cargando tu experiencia cliente…</h1>
          <p>Preparando autenticación y datos de la app móvil.</p>
        </div>
      </main>
    )
  }

  let submitLabel = 'Entrar'

  if (busy) {
    submitLabel = 'Procesando…'
  } else if (isRegistering) {
    submitLabel = 'Registrarme'
  }

  return (
    <main className="container shell">
      <section className="hero-panel card">
        <div>
          <p className="eyebrow">Clínica Veterinaria cliente</p>
          <h1>{welcomeMessage}</h1>
          <p>
            Accede a productos, ofertas para adoptantes y mascotas disponibles para darles un hogar.
          </p>
        </div>
        <div className="hero-badges">
          <span>HTTPS obligatorio</span>
          <span>Sesión de cliente</span>
          <span>Sin paneles admin</span>
        </div>
      </section>

      {auth ? (
        <>
          <nav className="tab-row">
            {(['inicio', 'tienda', 'adopciones', 'perfil'] as TabId[]).map((tab) => (
              <button
                key={tab}
                type="button"
                className={activeTab === tab ? 'tab-button active' : 'tab-button'}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'inicio' && 'Inicio'}
                {tab === 'tienda' && 'Tienda'}
                {tab === 'adopciones' && 'Adopciones'}
                {tab === 'perfil' && 'Perfil'}
              </button>
            ))}
          </nav>

          {notice && <div className="notice-banner">{notice}</div>}
          {error && <div className="error-banner">{error}</div>}

          {activeTab === 'inicio' && (
            <section className="grid two-column">
              <article className="card">
                <p className="eyebrow">Acceso rápido</p>
                <h2>Tu práctica del cliente</h2>
                <ul className="check-list">
                  <li>Compra productos de la clínica</li>
                  <li>Consulta ofertas para adoptantes</li>
                  <li>Revisa mascotas disponibles para adopción</li>
                </ul>
              </article>

              <article className="card">
                <p className="eyebrow">Seguridad</p>
                <h2>Prácticas aplicadas</h2>
                <ul className="check-list">
                  <li>Autenticación con token JWT</li>
                  <li>Validación de entradas en servidor</li>
                  <li>Sesión controlada y limpieza al cerrar sesión</li>
                </ul>
              </article>
            </section>
          )}

          {activeTab === 'tienda' && (
            <section className="stack">
              <div className="card">
                <p className="eyebrow">Productos</p>
                <h2>Catálogo para clientes</h2>
                <div className="product-grid">
                  {products.map((product) => (
                    <article key={product.id} className="product-card">
                      <div>
                        <p className="eyebrow">{product.category}</p>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                      </div>
                      <div className="product-footer">
                        <strong>{product.price.toFixed(2)}€</strong>
                        <span>{product.stock} en stock</span>
                        <button type="button" className="primary-button" onClick={() => handleOrder(product.id)} disabled={busy}>
                          Comprar
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="card">
                <p className="eyebrow">Ofertas exclusivas</p>
                <h2>Beneficios para adoptantes</h2>
                {exclusiveProducts.length === 0 ? (
                  <p>No hay ofertas exclusivas activas en este momento.</p>
                ) : (
                  <div className="product-grid">
                    {exclusiveProducts.map((product) => (
                      <article key={product.id} className="product-card accent-card">
                        <div>
                          <p className="eyebrow">{product.category}</p>
                          <h3>{product.name}</h3>
                          <p>{product.description}</p>
                        </div>
                        <div className="product-footer">
                          <strong>{product.final_price.toFixed(2)}€</strong>
                          <span>{product.discount_applied}% de descuento</span>
                          <button type="button" className="primary-button" onClick={() => handleOrder(product.id)} disabled={busy}>
                            Comprar
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {activeTab === 'adopciones' && (
            <section className="card">
              <p className="eyebrow">Conviértete en familia adoptiva</p>
              <h2>Mascotas disponibles</h2>
              <div className="pet-grid">
                {pets.map((pet) => (
                  <article key={pet.id} className="pet-card">
                    <p className="eyebrow">{pet.breed}</p>
                    <h3>{pet.name}</h3>
                    <p>{pet.description}</p>
                    <div className="pet-meta">
                      <span>{pet.age} años</span>
                      <span>{pet.status}</span>
                    </div>
                    <button type="button" className="primary-button" onClick={() => handleAdoptPet(pet.id)} disabled={busy}>
                      Adoptar
                    </button>
                  </article>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'perfil' && (
            <section className="grid two-column">
              <article className="card">
                <p className="eyebrow">Tu sesión</p>
                <h2>{auth.userEmail}</h2>
                <p>Token de cliente vigente para las rutas de tienda y adopciones.</p>
              </article>

              <article className="card">
                <p className="eyebrow">Acciones</p>
                <button type="button" className="secondary-button" onClick={handleLogout} disabled={busy}>
                  Cerrar sesión
                </button>
              </article>
            </section>
          )}
        </>
      ) : (
        <section className="card auth-card">
          <p className="eyebrow">Cliente móvil</p>
          <h2>{isRegistering ? 'Crea tu cuenta' : 'Inicia sesión'}</h2>
          <p>
            {isRegistering
              ? 'Regístrate para acceder a la tienda y a las adopciones desde tu móvil.'
              : 'Accede al catálogo de clientes y a las adopciones disponibles.'}
          </p>

          <form onSubmit={handleAuth} className="auth-form">
            {isRegistering && (
              <label>
                Nombre completo <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Nombre Apellido"
                />
              </label>
            )}

            <label>
              Email <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="tu@email.com"
              />
            </label>

            <label>
              Contraseña <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
              />
            </label>

            <button type="submit" className="primary-button" disabled={busy}>
              {submitLabel}
            </button>
          </form>

          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              setIsRegistering((current) => !current)
              setError('')
              setNotice('')
            }}
          >
            {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </section>
      )}
    </main>
  )
}

export default App
