// Cart management
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart')) || [];
    this.updateCartCount();
  }

  addItem(product) {
    const existingItem = this.items.find(item => String(item.id) === String(product.id));
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: String(product.id),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: product.quantity || 1
      });
    }

    this.saveCart();
    this.updateCartCount();
  }

  removeItem(productId) {
    this.items = this.items.filter(item => String(item.id) !== String(productId));
    this.saveCart();
    this.updateCartCount();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => String(item.id) === String(productId));
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(productId);
      }
    }
    this.saveCart();
    this.updateCartCount();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartCount();
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
    }
  }

  getTotalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getItems() {
    return this.items;
  }
}

// Initialize cart
const cart = new Cart();

// Export cart instance
export default cart; 

console.log('Cart items from localStorage:', cart.getItems()); 