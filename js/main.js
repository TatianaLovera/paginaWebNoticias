// Este script se encarga de manejar la interacción desde la página principal (index.html)
document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.getElementById('loginBtn');

  // Verificar si hay un usuario logueado en sessionStorage
  const usuarioGuardado = sessionStorage.getItem('usuarioLogueado');
  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    const nombreUsuario = usuario.usuario;
    const rol = usuario.rol;

    // Ocultar botón de login ya que el usuario está logueado
    if (loginBtn) {
      loginBtn.style.display = 'none';
    }

    const loginDiv = document.querySelector('.login');

    // Contenedor para el botón del usuario y el menú desplegable
    const contenedorUsuario = document.createElement('div');
    contenedorUsuario.classList.add('contenedor-usuario');

    // Crear botón con el nombre del usuario
    const usuarioBtn = document.createElement('button');
    usuarioBtn.textContent = nombreUsuario;
    usuarioBtn.classList.add('btn-usuario');

    // Crear el menú desplegable, se define según el rol del usuario
    let menu = document.createElement('ul');
    menu.classList.add('menu-desplegable');
    menu.style.display = 'none';

    // Usamos switch para asignar opciones según rol
    switch (rol) {
      case 'administrador':
        // Opción: Crear noticia
        const opcionCrearNoticiaAdmin = document.createElement('li');
        opcionCrearNoticiaAdmin.textContent = 'Crear noticia';
        opcionCrearNoticiaAdmin.addEventListener('click', () => {
          window.location.href = 'crear-noticia.html';
        });

        // Opción: Noticias pendientes
        const opcionNoticiasPendientes = document.createElement('li');
        opcionNoticiasPendientes.textContent = 'Noticias pendientes';
        opcionNoticiasPendientes.addEventListener('click', () => {
          window.location.href = 'admin/noticias-pendientes.html';
        });

        // Opción: Preguntas pendientes
        const opcionPreguntasPendientes = document.createElement('li');
        opcionPreguntasPendientes.textContent = 'Preguntas pendientes';
        opcionPreguntasPendientes.addEventListener('click', () => {
          window.location.href = 'enConstruccion.html';
        });

        // Opción: Cerrar sesión
        const opcionCerrarSesionAdmin = document.createElement('li');
        opcionCerrarSesionAdmin.textContent = 'Cerrar sesión';
        opcionCerrarSesionAdmin.addEventListener('click', () => {
          sessionStorage.removeItem('usuarioLogueado');
          location.reload();
        });

        // Agregamos las opciones al menú
        menu.appendChild(opcionCrearNoticiaAdmin);
        menu.appendChild(opcionNoticiasPendientes);
        menu.appendChild(opcionPreguntasPendientes);
        menu.appendChild(opcionCerrarSesionAdmin);
        break;

      case 'empleado':
        // Opción: Crear noticia
        const opcionCrearNoticiaEmp = document.createElement('li');
        opcionCrearNoticiaEmp.textContent = 'Crear noticia';
        opcionCrearNoticiaEmp.addEventListener('click', () => {
          window.location.href = 'crear-noticia.html';
        });

        // Opción: Mis preguntas
        const opcionMisPreguntasEmp = document.createElement('li');
        opcionMisPreguntasEmp.textContent = 'Mis preguntas';
        opcionMisPreguntasEmp.addEventListener('click', () => {
          window.location.href = 'enConstruccion.html';
        });

        // Opción: Cerrar sesión
        const opcionCerrarSesionEmp = document.createElement('li');
        opcionCerrarSesionEmp.textContent = 'Cerrar sesión';
        opcionCerrarSesionEmp.addEventListener('click', () => {
          sessionStorage.removeItem('usuarioLogueado');
          location.reload();
        });

        // Agregamos las opciones al menú
        menu.appendChild(opcionCrearNoticiaEmp);
        menu.appendChild(opcionMisPreguntasEmp);
        menu.appendChild(opcionCerrarSesionEmp);
        break;

      case 'vecino':
        // Opción: Mis preguntas
        const opcionMisPreguntasVec = document.createElement('li');
        opcionMisPreguntasVec.textContent = 'Mis preguntas';
        opcionMisPreguntasVec.addEventListener('click', () => {
          window.location.href = 'enConstruccion.html';
        });

        // Opción: Cerrar sesión
        const opcionCerrarSesionVec = document.createElement('li');
        opcionCerrarSesionVec.textContent = 'Cerrar sesión';
        opcionCerrarSesionVec.addEventListener('click', () => {
          sessionStorage.removeItem('usuarioLogueado');
          location.reload();
        });

        // Agregamos las opciones al menú
        menu.appendChild(opcionMisPreguntasVec);
        menu.appendChild(opcionCerrarSesionVec);
        break;

      default:
        // Si el rol no coincide, solo mostrar el botón que cierra sesión con confirmación
        usuarioBtn.addEventListener('click', function () {
          const cerrar = confirm('¿Querés cerrar sesión?');
          if (cerrar) {
            sessionStorage.removeItem('usuarioLogueado');
            location.reload();
          }
        });
        break;
    }

    // Solo si el menú tiene hijos, agregamos la lógica para mostrar/ocultar
    if (menu.children.length > 0) {
      usuarioBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (menu.classList.contains('menu-visible')) {
          menu.classList.remove('menu-visible');
          setTimeout(() => {
            if (!menu.classList.contains('menu-visible')) {
              menu.style.display = 'none';
            }
          }, 300);
        } else {
          menu.style.display = 'block';
          void menu.offsetHeight; // fuerza el reflow para activar transición
          menu.classList.add('menu-visible');
        }
      });

      // Cerrar menú al hacer clic fuera de él
      document.addEventListener('click', () => {
        if (menu.classList.contains('menu-visible')) {
          menu.classList.remove('menu-visible');
          setTimeout(() => {
            if (!menu.classList.contains('menu-visible')) {
              menu.style.display = 'none';
            }
          }, 300);
        }
      });

      // Agregamos el menú al contenedor
      contenedorUsuario.appendChild(menu);
    }

    // Agregamos el botón al contenedor
    contenedorUsuario.appendChild(usuarioBtn);
    loginDiv.appendChild(contenedorUsuario);

  } else {
    // Si no hay usuario logueado, el botón de login redirige a login.html
    loginBtn.addEventListener('click', function () {
      window.location.href = 'login.html';
    });
  }

  // Cargar y mostrar noticias públicas desde GitHub
  cargarNoticiasPublicas();
});

//Para el filtro de fecha y categoria
let todasLasNoticias = [];


// Cargar y mostrar solo noticias públicas desde GitHub
function cargarNoticiasPublicas() {
  fetch('https://raw.githubusercontent.com/TatianaLovera/paginaWebNoticias/main/datos/noticias.json')
    .then(response => response.json())
    .then(data => {
      const noticiasPublicas = data.filter(noticia => noticia.estado === 'publica');
      todasLasNoticias = noticiasPublicas;
      mostrarNoticias(noticiasPublicas);
      configurarBusqueda();      // << Activar lógica de búsqueda
      configurarFiltro();        // << Activar lógica del filtro
    })
    .catch(error => {
      console.error('Error al cargar las noticias desde GitHub:', error);
    });
}

function configurarBusqueda() {
  const btnBuscar = document.getElementById('btn-buscar');
  const campoBusqueda = document.getElementById('campo-busqueda');

  if (!btnBuscar || !campoBusqueda) return;

  btnBuscar.addEventListener('click', () => {
    campoBusqueda.style.display = campoBusqueda.style.display === 'none' ? 'block' : 'none';
    campoBusqueda.focus();
  });

  campoBusqueda.addEventListener('input', () => {
    const query = campoBusqueda.value.toLowerCase();
    const tarjetas = document.querySelectorAll('.noticia');

    tarjetas.forEach(tarjeta => {
      const titulo = tarjeta.querySelector('h3').textContent.toLowerCase();
      const descripcion = tarjeta.querySelector('p').textContent.toLowerCase();

      if (titulo.includes(query) || descripcion.includes(query)) {
        tarjeta.style.display = 'block';
      } else {
        tarjeta.style.display = 'none';
      }
    });
  });
}

function configurarFiltro() {
  const filtroFecha = document.getElementById('filtro-fecha');
  const filtroCategoria = document.getElementById('filtro-categoria');
  const btnAplicarFiltros = document.getElementById('btn-aplicar-filtros');

  if (!btnAplicarFiltros) return;

  btnAplicarFiltros.addEventListener('click', () => {
    const fechaSeleccionada = filtroFecha.value;
    const categoriaSeleccionada = filtroCategoria.value.toLowerCase();

    const filtradas = todasLasNoticias.filter(noticia => {
      const coincideFecha = !fechaSeleccionada || noticia.fecha === fechaSeleccionada;
      const coincideCategoria = !categoriaSeleccionada || noticia.categoria.toLowerCase() === categoriaSeleccionada;
      return coincideFecha && coincideCategoria;
    });

    mostrarNoticias(filtradas);
  });
}


// Mostrar noticias en la cuadrícula principal
function mostrarNoticias(noticias) {
  const contenedor = document.querySelector('.grid-noticias');
  contenedor.innerHTML = '';

  noticias.forEach(noticia => {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('noticia');

    const imagen = document.createElement('img');
    const rutaPrincipal = (noticia.imagen && noticia.imagen.trim() !== '') ? noticia.imagen : 'https://raw.githubusercontent.com/TatianaLovera/paginaWebNoticias/main/imagenes/logoMuni.jpg';
    imagen.src = rutaPrincipal;
    imagen.alt = `Imagen de ${noticia.titulo}`;
    imagen.classList.add('imagen-noticia');
    // En caso de error en la carga de imagen, se reemplaza por imagen de error
    imagen.onerror = () => imagen.src = 'imagenes/imagenEnCasoDeError.jpg';

    const titulo = document.createElement('h3');
    titulo.textContent = noticia.titulo;

    const resumen = document.createElement('p');
    resumen.textContent = noticia.resumen;

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(resumen);

    // Al hacer clic en la tarjeta se abre la noticia específica
    tarjeta.addEventListener('click', () => {
      window.location.href = `noticia.html?id=${noticia.id}`;
    });

    contenedor.appendChild(tarjeta);
  });
}

// Permitir que el logo redirija al inicio
document.addEventListener('DOMContentLoaded', () => {
  const logoTarjeta = document.getElementById('logo-tarjeta');
  if (logoTarjeta) {
    logoTarjeta.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
});

