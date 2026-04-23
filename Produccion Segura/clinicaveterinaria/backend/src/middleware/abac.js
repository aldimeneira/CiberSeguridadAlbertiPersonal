function requireAdopter(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'No autenticado' });
  if (['admin', 'ventas'].includes(req.user.role)) return next();
  if (req.user.role === 'cliente' && req.user.has_adopted) return next();
  return res.status(403).json({
    error: 'Oferta exclusiva para clientes que han adoptado mascotas',
    hint: '¡Adopta una mascota para desbloquear ofertas especiales! 🐾'
  });
}

function applyAdopterDiscount(req, res, next) {
  req.isAdopter = req.user?.has_adopted && req.user?.role === 'cliente';
  next();
}

module.exports = { requireAdopter, applyAdopterDiscount };