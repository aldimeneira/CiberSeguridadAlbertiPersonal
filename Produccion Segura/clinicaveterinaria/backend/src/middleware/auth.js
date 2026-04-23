const { supabase } = require('../config/supabase');

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: 'Token inválido' });

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, has_adopted, full_name')
      .eq('id', user.id)
      .single();

    req.user = { ...user, ...profile };
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    return res.status(401).json({ error: 'Autenticación fallida' });
  }
}

module.exports = { authenticate };