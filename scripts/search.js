// Fetch the company data from the JSON file
fetch('./json/companies.json')
  .then(response => {
    console.log('Fetching JSON data...');
    return response.json();
  })
  .then(companies => {
    console.log('Companies data:', companies);
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchButton.addEventListener('click', () => {
      const query = searchInput.value.toLowerCase();
      console.log('Search query:', query);
      const filteredCompanies = companies.filter(company => {
        return (
          company.name.toLowerCase().includes(query) ||
          company.industry.toLowerCase().includes(query) ||
          company.rating.toString().includes(query) ||
          company.worth.toString().includes(query)
        );
      });

      console.log('Filtered companies:', filteredCompanies);
      displayResults(filteredCompanies);
    });

    function displayResults(companies) {
      searchResults.innerHTML = '';
      if (companies.length === 0) {
        searchResults.innerHTML = '<p>No results found.</p>';
        return;
      }

      companies.forEach(company => {
        const companyDiv = document.createElement('div');
        companyDiv.classList.add('company-result');
        companyDiv.innerHTML = `
          <img src="${company.logo}" alt="${company.name} Logo" class="company-logo" />
          <h3>${company.name}</h3>
          <p>Industry: ${company.industry}</p>
          <p>Rating: ${company.rating}</p>
          <p>Worth: $${company.worth.toLocaleString()}</p>
        `;
        searchResults.appendChild(companyDiv);
      });
    }
  })
  .catch(error => console.error('Error fetching company data:', error));
