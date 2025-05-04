// Fetch the company data from the JSON file
fetch('./json/companies.json')
  .then(response => response.json())
  .then(companies => {
    const businessesGrid = document.querySelector('.businesses-grid');

    // Function to display companies
    const displayCompanies = (companies) => {
      businessesGrid.innerHTML = '';
      companies.forEach(company => {
        const companyContainer = document.createElement('div');
        companyContainer.classList.add('company-container');
        companyContainer.innerHTML = `
          <img src="${company.logo}" alt="${company.name} Logo" class="company-logo" />
          <h3>${company.name}</h3>
          <p>Rating: ${company.rating}</p>
          <p>Worth: $${(company.worth / 1000000).toFixed(1)}M</p>
          <p>Industry: ${company.industry}</p>
        `;

        // Add a button to view details
        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'View Details';
        // CSS for button
        detailsButton.classList.add('details-button');
        detailsButton.onclick = () => {
          localStorage.setItem('selectedCompany', JSON.stringify(company));
          window.location.href = './details.html';
        };
        companyContainer.appendChild(detailsButton);

        businessesGrid.appendChild(companyContainer);
      });
    };

    // Initial display
    displayCompanies(companies);

    // Sort by rating
    document.getElementById('sort-rating').addEventListener('click', () => {
      const sortedByRating = [...companies].sort((a, b) => b.rating - a.rating);
      displayCompanies(sortedByRating);
    });

    // Sort by worth
    document.getElementById('sort-worth').addEventListener('click', () => {
      const sortedByWorth = [...companies].sort((a, b) => b.worth - a.worth);
      displayCompanies(sortedByWorth);
    });
  })
  .catch(error => console.error('Error fetching company data:', error));
