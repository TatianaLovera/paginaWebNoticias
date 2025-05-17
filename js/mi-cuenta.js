
document.addEventListener('DOMContentLoaded', () => {
  const miCuentaBtn = document.getElementById('miCuentaBtn'); // Botón "Mi cuenta"
  const menuOpciones = document.getElementById('menuOpciones'); // Menú desplegable
  const cerrarSesion = document.getElementById('cerrarSesion'); // Opción para cerrar sesión

  // Alterna la visibilidad del menú al hacer clic en "Mi cuenta"
  miCuentaBtn?.addEventListener('click', () => {
    menuOpciones?.classList.toggle('oculto');
  });

  // Al hacer clic en "Cerrar sesión", se limpia la sesión y se redirige al inicio
  cerrarSesion?.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('usuarioLogueado');
    window.location.href = '../index.html';
  });

  // Verificación de sesión: si no hay un usuario logueado o no es administrador, redirige al login
  const usuario = JSON.parse(sessionStorage.getItem('usuarioLogueado'));
  if (!usuario || usuario.rol !== "administrador") {
    window.location.href = '../login.html';
  }

  

  linkNoticiasPendientes?.addEventListener('click', (e) => {
    e.preventDefault(); // Evitamos comportamiento por defecto
    window.location.href = 'noticias-pendientes.html'; // Redirigimos correctamente
  });
});