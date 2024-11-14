document.addEventListener('DOMContentLoaded', async () => {
  const searchForm = document.getElementById('searchForm');
  const searchResults = document.getElementById('searchResults');
  const searchQueryInput = document.getElementById('searchQuery');

  // Función para buscar y mostrar productos en la página
  async function fetchAndDisplayProducts(query = '') {
    try {
      const response = await fetch(`/search?query=${query}`);
      const results = await response.json();

      searchResults.innerHTML = ''; // Limpiar resultados previos

      if (results.length > 0) {
        results.forEach(item => {
          const discount = item.price * 0.15; // Ejemplo de descuento del 15%
          const discountedPrice = (item.price - discount).toFixed(2);
          searchResults.innerHTML += `
            <div class="product-card">
              <div class="product-image">
                <img src="${item.images[0]}" alt="${item.name}">
                <div class="badge">BLACK FRIDAY</div>
                <div class="discount">Ahorro de $${discount.toFixed(2)}</div>
              </div>
              <div class="product-info">
                <h3 class="product-name">${item.name}</h3>
                <p class="product-price-original">$${item.price.toFixed(2)}</p>
                <p class="product-price-discounted">$${discountedPrice} <span class="discount-rate">-15%</span></p>
                <div class="rating">
                  ⭐ ${item.rating} (${item.reviews}+)
                </div>
              </div>
            </div>
          `;
        });
      } else {
        searchResults.innerHTML = '<p>No se encontraron resultados</p>';
      }
    } catch (error) {
      searchResults.innerHTML = '<p>Error al realizar la búsqueda</p>';
    }
  }

  // Cargar todos los productos al cargar la página
  await fetchAndDisplayProducts();

  // Evento de búsqueda en el formulario
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = searchQueryInput.value.trim(); // Obtenemos el valor de búsqueda
    await fetchAndDisplayProducts(query); // Mostramos los productos que coincidan con el query
  });
});




  