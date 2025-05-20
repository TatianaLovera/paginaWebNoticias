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
          const rutaActual = window.location.pathname;        
        // Si estás en una subcarpeta como /usuario/
        if (rutaActual.includes('/usuario/')) {
          window.location.href = '../enConstruccion.html';
        } else {
          window.location.href = 'enConstruccion.html';
        }
        });

        // Opción: Preguntas pendientes
        const opcionPreguntasPendientes = document.createElement('li');
        opcionPreguntasPendientes.textContent = 'Preguntas pendientes';
        opcionPreguntasPendientes.addEventListener('click', () => {

        const rutaActual = window.location.pathname;
        

        // Si estás en una subcarpeta como /usuario/
        if (rutaActual.includes('/usuario/')) {
          window.location.href = '../enConstruccion.html';
        } else {
          window.location.href = 'enConstruccion.html';
        }
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

      case 'vecino':

      // Opción: perfil
          const opcionPerfilVec = document.createElement('li');
      opcionPerfilVec.textContent = 'Mi perfil';

      opcionPerfilVec.addEventListener('click', () => {
        const rutaActual = window.location.pathname;

        if (rutaActual.endsWith('/usuario/perfil.html')) {
          // Ya estás en perfil, no navegamos
          return;
        }

        if (rutaActual.includes('/usuario/')) {
          window.location.href = 'perfil.html';
        } else {
          window.location.href = 'usuario/perfil.html';
        }
      });


      // Opción: Mis preguntas
      const opcionMisPreguntasVec = document.createElement('li');
      opcionMisPreguntasVec.textContent = 'Mis preguntas';
      opcionMisPreguntasVec.addEventListener('click', () => {
        const rutaActual = window.location.pathname;
        
        // Si estás en una subcarpeta como /usuario/
        if (rutaActual.includes('/usuario/')) {
          window.location.href = '../enConstruccion.html';
        } else {
          window.location.href = 'enConstruccion.html';
        }
      });


        // Opción: Cerrar sesión
        const opcionCerrarSesionVec = document.createElement('li');
        opcionCerrarSesionVec.textContent = 'Cerrar sesión';
        opcionCerrarSesionVec.addEventListener('click', () => {
          sessionStorage.removeItem('usuarioLogueado');
          location.reload();
        });

        // Agregamos las opciones al menú
        menu.appendChild(opcionPerfilVec);
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
