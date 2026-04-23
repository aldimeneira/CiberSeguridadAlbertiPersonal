async function loadProducts() {
  const products = await globalThis.cvApi.apiFetch('/store/products');
  renderProducts(products, false);
}

async function loadExclusiveOffers() {
  const { products, adopter_benefits } = await globalThis.cvApi.apiFetch('/store/products/exclusive');
  if (adopter_benefits) {
    document.getElementById('adopter-badge').style.display = 'block';
    document.getElementById('adopter-badge').textContent =
      '🐾 ¡Tienes descuentos exclusivos por adoptar!';
  }
  renderProducts(products, adopter_benefits);
}

function renderProducts(products, showDiscount) {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = products.map(p => `
    <div class="product-card ${showDiscount && p.discount_applied > 0 ? 'exclusive' : ''}">
      <h3>${p.name}</h3>
      <p>${p.description || ''}</p>
      ${showDiscount && p.discount_applied > 0 ? `
        <span class="original-price">€${p.price}</span>
        <span class="discount-badge">-${p.discount_applied}% 🐾</span>
        <strong class="final-price">€${p.final_price}</strong>
      ` : `<strong>€${p.price}</strong>`}
      <button onclick="buyProduct('${p.id}')">Añadir al pedido</button>
    </div>
  `).join('');
}

async function buyProduct(productId) {
  try {
    const data = await globalThis.cvApi.apiFetch('/store/order', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity: 1 })
    });
    const savingsMessage = data.savings > 0 ? ` ¡Ahorraste €${data.savings}!` : '';
    alert(`✅ Pedido realizado.${savingsMessage}`);
  } catch (err) {
    alert(`❌ ${err.message}`);
  }
}