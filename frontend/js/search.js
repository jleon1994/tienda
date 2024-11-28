document.addEventListener('DOMContentLoaded', async () => {
  const searchForm = document.getElementById('searchForm');
  const searchResults = document.getElementById('searchResults');
  const searchQueryInput = document.getElementById('searchQuery');
  const sortBy = document.getElementById('sortBy'); // Selector de ordenación
  const priceRange = document.getElementById('priceRange');
  const category = document.getElementById('category');
  const rating = document.getElementById('rating');
  const toggleFilterBtn = document.getElementById('toggleFilterBtn');
  const filters = document.getElementById('filters');
  const priceValue = document.getElementById('priceValue');

  let products = []; // Productos originales cargados desde el servidor

  // Función para buscar y mostrar productos en la página
  async function fetchAndDisplayProducts(query = '') {
    try {
      const response = await fetch(`/search?query=${query}`);
      products = await response.json(); // Guardamos los productos originales para filtros y ordenación

      applyFiltersAndSorting(); // Aplicar filtros y ordenación
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
      searchResults.textContent = 'Error al realizar la búsqueda';
    }
  }

  // Función para mostrar los productos
  function displayProducts(productsToDisplay) {
    searchResults.innerHTML = ''; // Limpiamos los resultados anteriores
    const template = document.getElementById('productTemplate');

    productsToDisplay.forEach((item) => {
      const productCard = template.content.cloneNode(true);
      const discount = item.price * 0.15;
      const discountedPrice = (item.price - discount).toFixed(2);

      let productImage = 'https://via.placeholder.com/210x210?text=No+Image';

      if (item.images?.length > 0) {
        const img = item.images[0];
        //Debo verificar si img tiene http o https para ver si es un link valido
        if (img.startsWith('http://') || img.startsWith('https://')) {
          productImage = img;
        }
      }

      productCard.querySelector('.product-image img').src = productImage;
      productCard.querySelector('.product-image img').alt = item.name;
      productCard.querySelector('.discount').textContent = `Ahorro de $${discount.toFixed(2)}`;
      productCard.querySelector('.product-name').textContent = item.name;
      productCard.querySelector('.product-price-original').textContent = `$${item.price.toFixed(2)}`;
      productCard.querySelector('.product-price-discounted').innerHTML = `$${discountedPrice} <span class="discount-rate">-15%</span>`;
      productCard.querySelector('.rating').textContent = `⭐ ${item.rating || 0} (${item.reviews || 0}+)`;

      searchResults.appendChild(productCard);
    });
  }

  // Función para aplicar filtros y ordenación
  function applyFiltersAndSorting() {
    // Obtener valores de los filtros
    const maxPrice = parseInt(priceRange.value, 10);
    const selectedCategory = category.value;
    const minRating = parseInt(rating.value, 10);

    // Filtrar productos
    const filteredProducts = products.filter((product) => {
      const matchesPrice = product.price <= maxPrice;
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchesRating = product.rating >= minRating;

      return matchesPrice && matchesCategory && matchesRating;
    });

    // Aplicar ordenación
    const sortValue = sortBy.value;
    let sortedProducts;

    if (sortValue === 'price-asc') {
      sortedProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
      sortedProducts = filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'rating') {
      sortedProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
    } else {
      sortedProducts = filteredProducts; // Sin orden específico
    }

    displayProducts(sortedProducts); // Mostrar los productos filtrados y ordenados
  }

  // Evento de cambio en los filtros
  priceRange.addEventListener('input', (event) => {
    priceValue.textContent = `$0 - $${event.target.value}`;
    applyFiltersAndSorting(); // Actualizar productos
  });

  category.addEventListener('change', applyFiltersAndSorting);
  rating.addEventListener('change', applyFiltersAndSorting);

  // Evento de cambio en el selector de ordenación
  sortBy.addEventListener('change', applyFiltersAndSorting);

  // Evento para alternar la visibilidad de los filtros
  toggleFilterBtn.addEventListener('click', () => {
    if (filters.style.display === 'none' || filters.style.display === '') {
      filters.style.display = 'block';
      toggleFilterBtn.textContent = 'Ocultar Filtros';
    } else {
      filters.style.display = 'none';
      toggleFilterBtn.textContent = 'Mostrar Filtros';
    }
  });

  // Evento de búsqueda en el formulario
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = searchQueryInput.value.trim(); // Obtenemos el valor de búsqueda
    await fetchAndDisplayProducts(query); // Mostramos los productos que coincidan con el query
  });

  // Cargar todos los productos al cargar la página
  await fetchAndDisplayProducts();
});
