// Validacion de sesion - se redirecciona en el caso de que no haya usuario
if (!sessionStorage.getItem('usuarioLogueado')) {
  // Excepciones: permitimos acceder a index.html y login.html sin estar logueado
  const paginaActual = window.location.pathname.split('/').pop();
  const paginasPublicas = ['index.html', '', 'login.html'];

  if (!paginasPublicas.includes(paginaActual)) {
    alert('Necesitás estar logueado para acceder a esta página.');
            const rutaActual = window.location.pathname;
        
        // Si estas en una subcarpeta como /usuario/
        if (rutaActual.includes('/usuario/')) {
          window.location.href = '../index.html';
        } else {
          window.location.href = 'index.html';
        }
  }
}

// Cierre de sesion desde otra pestaña
window.addEventListener('storage', function(event) {
  if (event.key === 'usuarioLogueado' && event.newValue === null) {
    alert('Tu sesión ha sido cerrada.');
    window.location.href = 'index.html';
  }
});
