// Fetch the company data from the JSON file and display it
fetch('./json/companies.json')
  .then(response => response.json())
  .then(companies => {
    const companiesGrid = document.querySelector('.companies-grid');
    companies.forEach(company => {
      const companyContainer = document.createElement('div');
      companyContainer.classList.add('company-container');
      companyContainer.innerHTML = `
        <img src="${company.logo}" alt="${company.name} Logo" class="company-logo" />
        <h3>${company.name}</h3>
      `;
      companiesGrid.appendChild(companyContainer);

      // Add a button to each company container to switch to the details page
      const detailsButton = document.createElement('button');
      detailsButton.textContent = 'View Details';
      detailsButton.onclick = () => {
        localStorage.setItem('selectedCompany', JSON.stringify(company));
        window.location.href = './details.html';
      };
      companyContainer.appendChild(detailsButton);
    });
  })
  .catch(error => console.error('Error fetching company data:', error));

// Add some basic styles for the company containers
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .companies-grid {
      display: flex;
      overflow-x: auto;
      gap: 20px;
      padding: 20px;
    }
    .company-container {
      flex: 0 0 auto;
      width: 200px;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 10px;
      text-align: center;
      background-color: #f9f9f9;
    }
    .company-logo {
      width: 100%;
      height: auto;
      border-radius: 4px;
    }
  </style>
`);
