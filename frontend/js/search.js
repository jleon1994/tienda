document.addEventListener('DOMContentLoaded', async () => {
  const searchForm = document.getElementById('searchForm');
  const searchResults = document.getElementById('searchResults');
  const searchQueryInput = document.getElementById('searchQuery');

  // Función para buscar y mostrar productos en la página
  async function fetchAndDisplayProducts(query = '') {
    try {
      const response = await fetch(`/search?query=${query}`);
      const results = await response.json();
  
      const searchResults = document.getElementById('searchResults');
      searchResults.innerHTML = '';
  
      if (results.length > 0) {
        const template = document.getElementById('productTemplate');
        
        results.forEach(item => {
          // Clonar el template
          const productCard = template.content.cloneNode(true);
          
          // Calcular el descuento
          const discount = item.price * 0.15;
          const discountedPrice = (item.price - discount).toFixed(2);
  
          // Asignar la imagen del producto, usando `imageUrl` o la primera de `images`
          const productImage = item.imageUrl || (item.images && item.images.length > 0 ? item.images[0] : '');
          productCard.querySelector('.product-image img').src = productImage;
          productCard.querySelector('.product-image img').alt = item.name;
  
          productCard.querySelector('.discount').textContent = `Ahorro de $${discount.toFixed(2)}`;
          productCard.querySelector('.product-name').textContent = item.name;
          productCard.querySelector('.product-price-original').textContent = `$${item.price.toFixed(2)}`;
          productCard.querySelector('.product-price-discounted').innerHTML = `$${discountedPrice} <span class="discount-rate">-15%</span>`;
          productCard.querySelector('.rating').textContent = `⭐ ${item.rating || 0} (${item.reviews || 0}+)`;
  
          searchResults.appendChild(productCard);
        });
      } else {
        searchResults.textContent = 'No se encontraron resultados';
      }
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
      searchResults.textContent = 'Error al realizar la búsqueda';
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




  