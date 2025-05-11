// Initialize cart from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');

    // Clear current cart display
    cartItemsContainer.innerHTML = '';

    // Calculate totals
    let subtotal = 0;

    // Add each item to the cart display
    cart.forEach((item, index) => {
        subtotal += item.price;

        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-price">$${item.price.toLocaleString()}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Calculate tax and total
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    // Update summary
    subtotalElement.textContent = `$${subtotal.toLocaleString()}`;
    taxElement.textContent = `$${tax.toLocaleString()}`;
    totalElement.textContent = `$${total.toLocaleString()}`;

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Function to add item to cart
function addToCart(product) {
    cart.push(product);
    updateCartDisplay();
}

// Initialize cart display
updateCartDisplay();

// Add event listener for checkout button
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your purchase!');
    cart = [];
    updateCartDisplay();
});
