import cart from './cart.js';

// Update cart items display
function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const items = cart.getItems();
    
    if (!items || items.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }

    cartItemsContainer.innerHTML = items.map(item => `
        <div class="cart-item" data-id="${String(item.id)}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-price">$${item.price.toFixed(2)}</p>
                <div class="item-quantity">
                    <button class="quantity-btn minus">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus">+</button>
                </div>
            </div>
            <button class="remove-btn">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');

    // Add event listeners for quantity buttons and remove buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = e.target.closest('.cart-item').dataset.id;
            const item = items.find(i => i.id === itemId);
            if (item.quantity > 1) {
                cart.updateQuantity(itemId, item.quantity - 1);
                updateCartDisplay();
                updateSummary();
            }
        });
    });

    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = e.target.closest('.cart-item').dataset.id;
            const item = items.find(i => i.id === itemId);
            cart.updateQuantity(itemId, item.quantity + 1);
            updateCartDisplay();
            updateSummary();
        });
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = e.target.closest('.cart-item').dataset.id;
            cart.removeItem(itemId);
            updateCartDisplay();
            updateSummary();
        });
    });
}

// Update order summary
function updateSummary() {
    const items = cart.getItems();
    if (!items || items.length === 0) {
        document.getElementById('subtotal').textContent = '$0.00';
        document.getElementById('shipping').textContent = '$0.00';
        document.getElementById('total').textContent = '$0.00';
        return;
    }

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 10 : 0; // $10 shipping if cart is not empty
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Handle checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please sign in to proceed with checkout');
        window.location.href = './login.html';
        return;
    }

    const items = cart.getItems();
    if (!items || items.length === 0) {
        alert('Your cart is empty');
        return;
    }

    // Create order object
    const order = {
        id: Date.now().toString(),
        userId: currentUser.email,
        items: items,
        total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 10,
        date: new Date().toISOString(),
        status: 'completed'
    };

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    cart.clearCart();

    // Show success message
    alert('Order placed successfully! Thank you for your purchase.');
    window.location.href = './index.html';
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Update cart count in navbar
    cart.updateCartCount();
    
    // Update cart display and summary
    updateCartDisplay();
    updateSummary();
}); 