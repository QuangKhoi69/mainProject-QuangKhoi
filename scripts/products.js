import productsData from '../json/companies.json' assert { type: 'json' };

const productsGrid = document.querySelector('.products-grid');

// Flatten the products from all companies into a single array
const allProducts = productsData.flatMap(company => company.products.map(product => ({
  ...product,
  companyName: company.name
})));

// Sort products by rating first, then by price
allProducts.sort((a, b) => b.rating - a.rating || a.price - b.price);

// Create product cards and append to the grid
allProducts.forEach(product => {
  const productCard = document.createElement('div');
  productCard.classList.add('product-card');
  productCard.innerHTML = `
    <h3>${product.name}</h3>
    <p>Price: $${product.price}</p>
    <p>Rating: ${product.rating}</p>
    <p>Company: ${product.companyName}</p>
  `;
  productsGrid.appendChild(productCard);
});
