// frontend/js/search.js
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchResults = document.getElementById('searchResults');
  
    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const query = document.getElementById('searchQuery').value;
  
      try {
        const response = await fetch(`/search?query=${query}`);
        const results = await response.json();
  
        searchResults.innerHTML = ''; // Limpiar resultados previos
        if (results.length > 0) {
          results.forEach(item => {
            searchResults.innerHTML += `<p>${item.name} - ${item.price}</p>`;
          });
        } else {
          searchResults.innerHTML = '<p>No se encontraron resultados</p>';
        }
      } catch (error) {
        searchResults.innerHTML = '<p>Error al realizar la búsqueda</p>';
      }
    });
  });
  