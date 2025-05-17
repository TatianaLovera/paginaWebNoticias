// Este script se encarga de manejar la interacción desde la página principal (index.html)
document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.getElementById('loginBtn');

  // Verificar si hay un usuario logueado
  const usuarioGuardado = sessionStorage.getItem('usuarioLogueado');
  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    const nombreUsuario = usuario.usuario;
    const rol = usuario.rol;

    // Ocultar botón de login
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

    // Crear el menú desplegable (solo si es administrador)
    let menu = null;
    if (rol === 'administrador') {
      menu = document.createElement('ul');
      menu.classList.add('menu-desplegable');
      menu.style.display = 'none';

      // Crear opciones del menú
      const opcionNoticias = document.createElement('li');
      opcionNoticias.textContent = 'Noticias pendientes';
      opcionNoticias.addEventListener('click', () => {
        window.location.href = 'admin/noticias-pendientes.html';
      });

      const opcionPreguntas = document.createElement('li');
      opcionPreguntas.textContent = 'Preguntas pendientes';
      opcionPreguntas.addEventListener('click', () => {
        window.location.href = 'admin/preguntas-pendientes.html';
      });

      const opcionCerrarSesion = document.createElement('li');
      opcionCerrarSesion.textContent = 'Cerrar sesión';
      opcionCerrarSesion.addEventListener('click', () => {
        sessionStorage.removeItem('usuarioLogueado');
        location.reload();
      });

      menu.appendChild(opcionNoticias);
      menu.appendChild(opcionPreguntas);
      menu.appendChild(opcionCerrarSesion);
      
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
          void menu.offsetHeight;
          menu.classList.add('menu-visible');
        }
      });

      document.addEventListener('click', () => {
        if (menu && menu.classList.contains('menu-visible')) {
          menu.classList.remove('menu-visible');
          setTimeout(() => {
            if (!menu.classList.contains('menu-visible')) {
              menu.style.display = 'none';
            }
          }, 300);
        }
      });

      contenedorUsuario.appendChild(menu);
    } else {
      usuarioBtn.addEventListener('click', function () {
        const cerrar = confirm('¿Querés cerrar sesión?');
        if (cerrar) {
          sessionStorage.removeItem('usuarioLogueado');
          location.reload();
        }
      });
    }

    contenedorUsuario.appendChild(usuarioBtn);
    loginDiv.appendChild(contenedorUsuario);
  } else {
    loginBtn.addEventListener('click', function () {
      window.location.href = 'login.html';
    });
  }

  // Cargar y mostrar noticias públicas desde GitHub
  cargarNoticiasPublicas();
});

// Cargar y mostrar solo noticias públicas desde GitHub
function cargarNoticiasPublicas() {
  fetch('https://raw.githubusercontent.com/TatianaLovera/paginaWebNoticias/main/datos/noticias.json')
    .then(response => response.json())
    .then(data => {
      const noticiasPublicas = data.filter(noticia => noticia.estado === 'publica');
      mostrarNoticias(noticiasPublicas);
    })
    .catch(error => {
      console.error('Error al cargar las noticias desde GitHub:', error);
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
    const rutaPrincipal = (noticia.imagen && noticia.imagen.trim() !== '') ? noticia.imagen : 'imagenes/logoMuni.jpg';
    imagen.src = rutaPrincipal;
    imagen.alt = `Imagen de ${noticia.titulo}`;
    imagen.classList.add('imagen-noticia');
    imagen.onerror = () => imagen.src = 'imagenes/imagenEnCasoDeError.jpg';

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

// Permitir que el logo redirija al inicio
document.addEventListener('DOMContentLoaded', () => {
  const logoTarjeta = document.getElementById('logo-tarjeta');
  if (logoTarjeta) {
    logoTarjeta.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
});

