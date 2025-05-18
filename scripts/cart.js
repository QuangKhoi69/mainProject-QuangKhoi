// Cart management
let items = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(items));
}

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

function addItem(product) {
  const existingItem = items.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
}

function removeItem(productId) {
  items = items.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
}

function updateQuantity(productId, quantity) {
  const item = items.find(item => item.id === productId);
  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      removeItem(productId);
    }
  }
  saveCart();
  updateCartCount();
}

function clearCart() {
  items = [];
  saveCart();
  updateCartCount();
}

function getItems() {
  return items;
}

function getTotalItems() {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

updateCartCount();

export {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  getItems,
  getTotalItems
};

console.log('Cart items from localStorage:', getItems()); 