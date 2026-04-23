const express = require('express');
const router = express.Router();
const { supabase, supabaseAdmin } = require('../config/supabase');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('status', 'available');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/',
  authenticate,
  authorize(['cliente']),
  async (req, res) => {
    const { pet_id } = req.body;

    const { data: pet } = await supabase
      .from('pets')
      .select('id, status, name')
      .eq('id', pet_id)
      .single();

    if (!pet?.status || pet.status !== 'available') {
      return res.status(400).json({ error: 'Mascota no disponible para adopción' });
    }

    const { data, error } = await supabaseAdmin
      .from('adoptions')
      .insert({ pet_id, client_id: req.user.id })
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });

    await supabaseAdmin.from('pets').update({ status: 'adopted' }).eq('id', pet_id);

    res.status(201).json({
      adoption: data,
      message: `¡Felicidades! ${pet.name} ya es tuya/o. 🐾 Tienes acceso a ofertas exclusivas en la Clínica Veterinaria.`
    });
  }
);

router.post('/pets',
  authenticate,
  authorize(['admin', 'ventas']),
  async (req, res) => {
    const { data, error } = await supabaseAdmin
      .from('pets')
      .insert(req.body)
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  }
);

module.exports = router;