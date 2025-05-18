import cart from './cart.js';

// Get product details from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

let currentProduct = null; // <--- Thêm biến toàn cục này

function getProductFromLocalStorage() {
  const products = JSON.parse(localStorage.getItem('selectedProduct'));
  if (products && products.id == productId) {
    return products;
  }
  return null;
}
// Fetch product details
async function fetchProductDetails() {
  try {
    const response = await fetch(`/api/products/${productId}`);
    const product = await response.json();
    currentProduct = product; // <--- Lưu lại sản phẩm
    displayProductDetails(product);
  } catch (error) {
    // Nếu fetch lỗi, lấy từ localStorage
    const localProduct = getProductFromLocalStorage();
    if (localProduct) {
      currentProduct = localProduct;
      displayProductDetails(localProduct);
    } else {
      alert('Không tìm thấy thông tin sản phẩm!');
    }
  }
}

function displayProductDetails(product) {
  document.getElementById('products-name').textContent = product.name;
  document.getElementById('products-price').textContent = `$${product.price}`;
  document.getElementById('products-rating').textContent = `Rating: ${product.rating}/5`;
  document.getElementById('products-description').textContent = product.description;
}

// Handle form submission
document.getElementById('transaction-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const payment = document.getElementById('payment').value;

  // Lấy sản phẩm từ biến toàn cục, không lấy từ DOM
  if (!currentProduct) {
    alert('Product information is not loaded yet!');
    return;
  }

  cart.addItem({
    id: String(currentProduct.id),
    name: currentProduct.name,
    price: currentProduct.price,
    quantity: 1
  });

  alert('Product added to cart successfully!');
  
  // Redirect to cart page
  window.location.href = './cart.html';
});

// Initialize page
fetchProductDetails();
selectedProduct.products.forEach(product => {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <strong>${product.name}</strong><br>
    Price: $${product.price.toLocaleString()}<br>
    Rating: ${product.rating}<br>
    Description: ${product.description}
  `;
  productsList.appendChild(listItem);
});

//Handle Transactions

// Handle form submission
document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment').value;
    
    // Create cart item
    const cartItem = {
        name: selectedProduct.name,
        price: selectedProduct.price,
        email: email,
        address: address,
        paymentMethod: paymentMethod
    };
    
    // Add to cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Redirect to shopping cart
    window.location.href = 'shoppingcart.html';
});
