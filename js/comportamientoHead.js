// Este script se encarga de manejar la interacción desde la pagina principal (index.html)
document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.getElementById('loginBtn');


  // Verifica si hay un usuario logueado en sessionStorage
  const usuarioGuardado = sessionStorage.getItem('usuarioLogueado');
  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    const nombreUsuario = usuario.usuario;
    const rol = usuario.rol;

    // Oculta el boton de login ya que el usuario esta logueado
    if (loginBtn) {
      loginBtn.style.display = 'none';
    }

    const loginDiv = document.querySelector('.login');

    // Contenedor para el boton del usuario y el menu desplegable
    const contenedorUsuario = document.createElement('div');
    contenedorUsuario.classList.add('contenedor-usuario');

    // Crea un boton con el nombre del usuario
    const usuarioBtn = document.createElement('button');
    usuarioBtn.textContent = nombreUsuario;
    usuarioBtn.classList.add('btn-usuario');

    // Crea el menu desplegable, dependiendo el rol del usuario
    let menu = document.createElement('ul');
    menu.classList.add('menu-desplegable');
    menu.style.display = 'none';

    // Usamos switch para asignar opciones segun el rol
    switch (rol) {
      case 'administrador':
        // Crear noticia
        const opcionCrearNoticiaAdmin = document.createElement('li');
        opcionCrearNoticiaAdmin.textContent = 'Crear noticia';
        opcionCrearNoticiaAdmin.addEventListener('click', () => {
          window.location.href = 'crear-noticia.html';
        });

        // Noticias pendientes
        const opcionNoticiasPendientes = document.createElement('li');
        opcionNoticiasPendientes.textContent = 'Noticias pendientes';
        opcionNoticiasPendientes.addEventListener('click', () => {
          window.location.href = 'enConstruccion.html';
        });

        // Preguntas pendientes
        const opcionPreguntasPendientes = document.createElement('li');
        opcionPreguntasPendientes.textContent = 'Preguntas pendientes';
        opcionPreguntasPendientes.addEventListener('click', () => {
          window.location.href = 'enConstruccion.html';
        });

        // Cerrar sesión
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

      case 'vecino':

      // Perfil
          const opcionPerfilVec = document.createElement('li');
      opcionPerfilVec.textContent = 'Mi perfil';

      opcionPerfilVec.addEventListener('click', () => {
        const rutaActual = window.location.pathname;

        if (rutaActual.endsWith('/usuario/perfil.html')) {
          // Ya esta en el perfil, no navegamos
          return;
        }

        if (rutaActual.includes('/usuario/')) {
          window.location.href = 'perfil.html';
        } else {
          window.location.href = 'usuario/perfil.html';
        }
      });


      // Mis preguntas
      const opcionMisPreguntasVec = document.createElement('li');
      opcionMisPreguntasVec.textContent = 'Mis preguntas';
      opcionMisPreguntasVec.addEventListener('click', () => {
        const rutaActual = window.location.pathname;
        
        // Si estas en una subcarpeta como /usuario/
        if (rutaActual.includes('/usuario/')) {
          window.location.href = '../enConstruccion.html';
        } else {
          window.location.href = 'enConstruccion.html';
        }
      });


        // Cerrar sesión
        const opcionCerrarSesionVec = document.createElement('li');
        opcionCerrarSesionVec.textContent = 'Cerrar sesión';
        opcionCerrarSesionVec.addEventListener('click', () => {
          sessionStorage.removeItem('usuarioLogueado');
          location.reload();
        });

        // Agregamos las opciones al menu
        menu.appendChild(opcionPerfilVec);
        menu.appendChild(opcionMisPreguntasVec);
        menu.appendChild(opcionCerrarSesionVec);
        break;

      default:
        // Si el rol no coincide, solo mostrar el boton que cierra sesion con confirmacion
        usuarioBtn.addEventListener('click', function () {
          const cerrar = confirm('¿Querés cerrar sesión?');
          if (cerrar) {
            sessionStorage.removeItem('usuarioLogueado');
            location.reload();
          }
        });
        break;
    }

    // Solo si el menu tiene hijos, agregamos la logica para mostrar/ocultar
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
          void menu.offsetHeight; // fuerza el reflow para activar transicion
          menu.classList.add('menu-visible');
        }
      });

      // Cierra el menu al hacer clic fuera de el
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

      // Agregamos el menu al contenedor
      contenedorUsuario.appendChild(menu);
    }

    // Agregamos el boton al contenedor
    contenedorUsuario.appendChild(usuarioBtn);
    loginDiv.appendChild(contenedorUsuario);

  } else {
    // Si no hay usuario logueado, el boton de login redirige a login.html
    loginBtn.addEventListener('click', function () {
      window.location.href = 'login.html';
    });
  }


});

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
