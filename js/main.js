cargarNoticiasPublicas();

let todasLasNoticias = [];

// Cargamos y mostramos solo noticias publicas
function cargarNoticiasPublicas() {
  fetch('https://raw.githubusercontent.com/TatianaLovera/paginaWebNoticias/main/datos/noticias.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('El formato de datos no es un array');
      }

      const noticiasPublicas = data.filter(noticia => noticia.estado === 'publica');
      todasLasNoticias = noticiasPublicas;

      mostrarNoticias(noticiasPublicas);
      aplicarFiltros();
    })
    .catch(error => {
      console.error('Error al cargar las noticias desde GitHub:', error);

      // Si no se pueden cargar las noticias, muestra mensaje de error.
      const contenedorNoticias = document.getElementById('contenedor-noticias');
      if (contenedorNoticias) {
        contenedorNoticias.innerHTML = `
          <p style="color: red; text-align: center;">
            ⚠️ No se pudieron cargar las noticias. Intente recargar la página más tarde.
          </p>
        `;
      }
    });
}

// Filtros de búsqueda
const btnFiltros = document.getElementById('btnFiltros');
const dropdownFiltros = document.getElementById('dropdownFiltros');
const btnAplicarFiltros = document.getElementById('btnAplicarFiltros');

const inputTexto = document.getElementById('filtroTexto');
const inputFecha = document.getElementById('filtroFecha');
const inputCategoria = document.getElementById('filtroCategoria');

btnFiltros.addEventListener('click', () => {
  dropdownFiltros.style.display =
    dropdownFiltros.style.display === 'none' || dropdownFiltros.style.display === ''
      ? 'block'
      : 'none';
});

  window.addEventListener('click', (event) => {
  if (!btnFiltros.contains(event.target) && !dropdownFiltros.contains(event.target)) {
    dropdownFiltros.style.display = 'none';
  }
});

function aplicarFiltros() {
  const texto = inputTexto.value.trim().toLowerCase();
  const fecha = inputFecha.value;
  const categoria = inputCategoria.value.toLowerCase();

  const noticiasFiltradas = [];

  for (let i = 0; i < todasLasNoticias.length; i++) {
    const noticia = todasLasNoticias[i];

    const tituloCoincide = noticia.titulo.toLowerCase().includes(texto);
    const resumenCoincide = noticia.resumen.toLowerCase().includes(texto);
    const textoCoincide = texto === '' || tituloCoincide || resumenCoincide;

    const fechaCoincide = fecha === '' || noticia.fecha === fecha;
    const categoriaCoincide = categoria === '' || noticia.categoria.toLowerCase() === categoria;

    if (textoCoincide && fechaCoincide && categoriaCoincide) {
      noticiasFiltradas.push(noticia);
    }
  }

  mostrarNoticias(noticiasFiltradas);
}


btnAplicarFiltros.addEventListener('click', () => {
  aplicarFiltros();
  dropdownFiltros.style.display = 'none';
});

inputTexto.addEventListener('input', () => {
  aplicarFiltros();
});

function mostrarNoticias(noticias) {
  const contenedor = document.querySelector('.grid-noticias');
  contenedor.innerHTML = '';

  if (noticias.length === 0) {
    contenedor.innerHTML = '<p>No hay noticias disponibles.</p>';
    return;
  }


  noticias.forEach(noticia => {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('noticia');

    const imagen = document.createElement('img');
    const rutaPrincipal = (noticia.imagen && noticia.imagen.trim() !== '') ? noticia.imagen : 'https://raw.githubusercontent.com/TatianaLovera/paginaWebNoticias/main/imagenes/logoMuni.jpg';
    imagen.src = rutaPrincipal;
    imagen.alt = `Imagen de ${noticia.titulo}`;
    imagen.classList.add('imagen-noticia');
    // En caso de error en la carga de imagen, se reemplaza por imagen de error
    imagen.onerror = () => imagen.src = 'https://raw.githubusercontent.com/TatianaLovera/paginaWebNoticias/main/imagenes/imagenEnCasoDeError.jpg';

    const titulo = document.createElement('h3');
    titulo.textContent = noticia.titulo;

    const resumen = document.createElement('p');
    resumen.textContent = noticia.resumen;

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(resumen);

    tarjeta.addEventListener('click', () => {
      window.location.href = `noticia.html?id=${noticia.id}`;
    });

    contenedor.appendChild(tarjeta);
  });

}




