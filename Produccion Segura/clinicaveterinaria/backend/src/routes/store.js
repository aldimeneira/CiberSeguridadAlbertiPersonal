const express = require('express');
const router = express.Router();
const { supabase, supabaseAdmin } = require('../config/supabase');
const { authenticate } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const { applyAdopterDiscount } = require('../middleware/abac');
const { body, validationResult } = require('express-validator');

router.get('/products', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, description, price, category, stock')
    .gt('stock', 0);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get('/products/exclusive', authenticate, applyAdopterDiscount, async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .gt('discount_adopter', 0);
  if (error) return res.status(500).json({ error: error.message });

  const products = data.map(p => ({
    ...p,
    final_price: req.isAdopter
      ? +(p.price * (1 - p.discount_adopter / 100)).toFixed(2)
      : p.price,
    discount_applied: req.isAdopter ? p.discount_adopter : 0
  }));

  res.json({ products, adopter_benefits: req.isAdopter });
});

router.post('/order',
  authenticate,
  authorize(['cliente']),
  applyAdopterDiscount,
  [
    body('product_id').isUUID(),
    body('quantity').isInt({ min: 1 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { product_id, quantity } = req.body;

    const { data: product } = await supabase
      .from('products')
      .select('price, discount_adopter, stock, name')
      .eq('id', product_id)
      .single();

    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    if (product.stock < quantity) return res.status(400).json({ error: 'Stock insuficiente' });

    const discount = req.isAdopter ? product.discount_adopter : 0;
    const unit_price = +(product.price * (1 - discount / 100)).toFixed(2);

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .insert({ client_id: req.user.id, product_id, quantity, unit_price, discount_applied: discount })
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({
      order,
      savings: +((product.price - unit_price) * quantity).toFixed(2)
    });
  }
);

router.post('/products',
  authenticate,
  authorize(['admin', 'ventas']),
  [
    body('name').notEmpty().trim(),
    body('price').isFloat({ min: 0 }),
    body('stock').isInt({ min: 0 }),
    body('discount_adopter').optional().isFloat({ min: 0, max: 100 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert(req.body)
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  }
);

module.exports = router;