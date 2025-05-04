// Retrieve the selected product from localStorage
const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

if (selectedProduct) {
  document.getElementById('products-name').textContent = selectedProduct.name;
  document.getElementById('products-price').textContent = `Price: $${selectedProduct.price.toLocaleString()}`;
  document.getElementById('products-rating').textContent = `Rating: ${selectedProduct.rating}`;
  document.getElementById('products-description').textContent = selectedProduct.description;
} else {
  document.body.innerHTML = '<p>No product selected. Please go back and select a product.</p>';
}

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