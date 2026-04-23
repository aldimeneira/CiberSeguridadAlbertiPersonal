const express = require('express');
const router = express.Router();
const { supabaseAdmin } = require('../config/supabase');

router.get('/callback', (req, res) => {
  res.redirect(`${process.env.APP_URL}/dashboard.html`);
});

router.post('/register', async (req, res) => {
  const { email, password, full_name, role = 'cliente' } = req.body;

  const allowedRoles = ['cliente'];
  if (!allowedRoles.includes(role) && !req.headers['x-admin-key']) {
    return res.status(403).json({ error: 'No autorizado para asignar este rol' });
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    user_metadata: { full_name, role },
    email_confirm: true
  });

  if (error) return res.status(400).json({ error: error.message });

  await supabaseAdmin.from('profiles').insert({
    id: data.user.id,
    full_name,
    role
  });

  res.status(201).json({
    message: 'Usuario registrado en Clínica Veterinaria',
    user_id: data.user.id
  });
});

module.exports = router;