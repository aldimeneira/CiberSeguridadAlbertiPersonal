-- ============================================
-- CLINICA VETERINARIA 
-- ============================================

CREATE TYPE user_role AS ENUM ('admin', 'cliente', 'veterinario', 'ventas');

CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'cliente',
  has_adopted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  species TEXT,
  breed TEXT,
  age INT,
  status TEXT DEFAULT 'available',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE adoptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id UUID REFERENCES pets(id),
  client_id UUID REFERENCES profiles(id),
  adopted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION set_adopter_flag()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles SET has_adopted = TRUE WHERE id = NEW.client_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_adoption
AFTER INSERT ON adoptions
FOR EACH ROW EXECUTE FUNCTION set_adopter_flag();

CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  discount_adopter DECIMAL(5,2) DEFAULT 0,
  stock INT DEFAULT 0,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE vet_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  discount_adopter DECIMAL(5,2) DEFAULT 0,
  vet_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES profiles(id),
  vet_id UUID REFERENCES profiles(id),
  service_id UUID REFERENCES vet_services(id),
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT
);

CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES profiles(id),
  product_id UUID REFERENCES products(id),
  quantity INT,
  unit_price DECIMAL(10,2),
  discount_applied DECIMAL(5,2) DEFAULT 0,
  ordered_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE adoptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE vet_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "clients_own_orders" ON orders
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "admin_all_orders" ON orders
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "ventas_manage_products" ON products
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin','ventas'))
  );

CREATE POLICY "public_read_products" ON products
  FOR SELECT USING (true);

CREATE POLICY "public_read_pets" ON pets
  FOR SELECT USING (true);

CREATE POLICY "vet_own_appointments" ON appointments
  FOR ALL USING (
    auth.uid() = vet_id OR auth.uid() = client_id OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "vet_manage_services" ON vet_services
  FOR ALL USING (
    auth.uid() = vet_id OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "public_read_services" ON vet_services
  FOR SELECT USING (true);