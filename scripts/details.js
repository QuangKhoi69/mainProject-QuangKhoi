// Retrieve the selected company from localStorage
const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany'));

if (selectedCompany) {
  document.getElementById('company-logo').src = selectedCompany.logo;
  document.getElementById('company-name').textContent = selectedCompany.name;
  document.getElementById('company-description').textContent = selectedCompany.description;

  const productsList = document.getElementById('company-products');
  selectedCompany.products.forEach(product => {
    const listItem = document.createElement('li');
    listItem.textContent = product;
    productsList.appendChild(listItem);
  });
} else {
  document.body.innerHTML = '<p>No company selected. Please go back and select a company.</p>';
}
