document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.getElementById('loginBtn');


  // Verifica si hay un usuario logueado en sessionStorage
  const usuarioGuardado = sessionStorage.getItem('usuarioLogueado');
  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    const nombreUsuario = usuario.usuario;
    const rol = usuario.rol;

    if (loginBtn) {
      loginBtn.style.display = 'none';
    }

    const loginDiv = document.querySelector('.login');

    // Contenedor para el boton del usuario y el menu desplegable
    const contenedorUsuario = document.createElement('div');
    contenedorUsuario.classList.add('contenedor-usuario');

    const usuarioBtn = document.createElement('button');
    usuarioBtn.textContent = nombreUsuario;
    usuarioBtn.classList.add('btn-usuario');

    let menu = document.createElement('ul');
    menu.classList.add('menu-desplegable');
    menu.style.display = 'none';

    switch (rol) {
      case 'administrador':
        const opcionCrearNoticiaAdmin = document.createElement('li');
        opcionCrearNoticiaAdmin.textContent = 'Crear noticia';
        opcionCrearNoticiaAdmin.addEventListener('click', () => {
          window.location.href = 'crear-noticia.html';
        });

        const opcionNoticiasPendientes = document.createElement('li');
        opcionNoticiasPendientes.textContent = 'Noticias pendientes';
        opcionNoticiasPendientes.addEventListener('click', () => {
          window.location.href = 'enConstruccion.html';
        });

        const opcionPreguntasPendientes = document.createElement('li');
        opcionPreguntasPendientes.textContent = 'Preguntas pendientes';
        opcionPreguntasPendientes.addEventListener('click', () => {
          window.location.href = 'enConstruccion.html';
        });

        const opcionCerrarSesionAdmin = document.createElement('li');
        opcionCerrarSesionAdmin.textContent = 'Cerrar sesión';
        opcionCerrarSesionAdmin.addEventListener('click', () => {
          sessionStorage.removeItem('usuarioLogueado');
          location.reload();
        });

        menu.appendChild(opcionCrearNoticiaAdmin);
        menu.appendChild(opcionNoticiasPendientes);
        menu.appendChild(opcionPreguntasPendientes);
        menu.appendChild(opcionCerrarSesionAdmin);
        break;

      case 'vecino':

          const opcionPerfilVec = document.createElement('li');
      opcionPerfilVec.textContent = 'Mi perfil';

      opcionPerfilVec.addEventListener('click', () => {
        const rutaActual = window.location.pathname;

        if (rutaActual.endsWith('/usuario/perfil.html')) {
          return;
        }

        if (rutaActual.includes('/usuario/')) {
          window.location.href = 'perfil.html';
        } else {
          window.location.href = 'usuario/perfil.html';
        }
      });

      const opcionMisPreguntasVec = document.createElement('li');
      opcionMisPreguntasVec.textContent = 'Mis preguntas';
      opcionMisPreguntasVec.addEventListener('click', () => {
        const rutaActual = window.location.pathname;
        
        if (rutaActual.includes('/usuario/')) {
          window.location.href = '../enConstruccion.html';
        } else {
          window.location.href = 'enConstruccion.html';
        }
      });

        const opcionCerrarSesionVec = document.createElement('li');
        opcionCerrarSesionVec.textContent = 'Cerrar sesión';
        opcionCerrarSesionVec.addEventListener('click', () => {
          sessionStorage.removeItem('usuarioLogueado');
          location.reload();
        });

        menu.appendChild(opcionPerfilVec);
        menu.appendChild(opcionMisPreguntasVec);
        menu.appendChild(opcionCerrarSesionVec);
        break;

      default:
        usuarioBtn.addEventListener('click', function () {
          const cerrar = confirm('¿Querés cerrar sesión?');
          if (cerrar) {
            sessionStorage.removeItem('usuarioLogueado');
            location.reload();
          }
        });
        break;
    }

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
          void menu.offsetHeight;
          menu.classList.add('menu-visible');
        }
      });

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

      contenedorUsuario.appendChild(menu);
    }

    contenedorUsuario.appendChild(usuarioBtn);
    loginDiv.appendChild(contenedorUsuario);

  } else {
    loginBtn.addEventListener('click', function () {
      window.location.href = 'login.html';
    });
  }


});

// Click en Logo redirige a index.html desde cualquier ruta
const logoTarjeta = document.getElementById('logo-tarjeta');
if (logoTarjeta) {
  logoTarjeta.addEventListener('click', () => {
    const rutaActual = window.location.pathname;

    if (rutaActual.includes('/usuario/')) {
      window.location.href = '../index.html';
    } else {
      window.location.href = 'index.html';
    }
  });
}
