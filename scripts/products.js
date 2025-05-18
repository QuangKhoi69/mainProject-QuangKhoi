fetch('./json/companies.json')
  .then(response => response.json())
  .then(companies => {
    const productsGrid = document.querySelector('.products-grid');
    const searchInput = document.getElementById('search-input');

    const allProducts = companies.flatMap(company => company.products.map(product => ({
      ...product,
      companyName: company.name
    })));

    const displayProducts = (products) => {
      productsGrid.innerHTML = '';
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
          <div>
            <h3>${product.name}</h3>
            <p>Company: ${product.companyName}</p>
          </div>
          <div>
            <p>Rating: ${product.rating}</p>
            <p>Price: $${product.price}</p>
          </div>
        `;

        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'View Details';
        detailsButton.classList.add('details-button');
        detailsButton.onclick = () => {
          localStorage.setItem('selectedProduct', JSON.stringify(product));
          window.location.href = './productsdetails.html';
        };
        productCard.appendChild(detailsButton);

        productsGrid.appendChild(productCard);
      });
    };

    const filterProducts = (searchTerm) => {
      const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      displayProducts(filtered);
    };

    // Initial display
    displayProducts(allProducts);

    // Search functionality
    searchInput.addEventListener('input', (e) => {
      filterProducts(e.target.value);
    });

    // Sort by rating
    document.getElementById('sort-rating').addEventListener('click', () => {
      const sortedByRating = [...allProducts].sort((a, b) => b.rating - a.rating);
      displayProducts(sortedByRating);
    });

    // Sort by price
    document.getElementById('sort-price').addEventListener('click', () => {
      const sortedByPrice = [...allProducts].sort((a, b) => a.price - b.price);
      displayProducts(sortedByPrice);
    });
  })
  .catch(error => console.error('Error fetching product data:', error));
