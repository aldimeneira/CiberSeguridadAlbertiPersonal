import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export const SUPABASE_URL = 'https://lfxoxooctugkkpcezjmf.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJsb_publishable_4IOxMrU2tQEKny02kmg49Q_x4TxWH-W';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: new URL('dashboard.html', globalThis.location.href).href,
      scopes: 'email profile'
    }
  });
  if (error) alert('Error: ' + error.message);
}

async function loginWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  if (!data?.session?.access_token) throw new Error('No se pudo iniciar sesión');
  localStorage.setItem('cv_access_token', data.session.access_token);
  globalThis.location.href = 'dashboard.html';
}

async function logout() {
  await supabase.auth.signOut();
  localStorage.removeItem('cv_access_token');
  globalThis.location.href = 'index.html';
}

async function getToken() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token;
}

globalThis.cvAuth = { loginWithGoogle, loginWithEmail, logout, getToken };