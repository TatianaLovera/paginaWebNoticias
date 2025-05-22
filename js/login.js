document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const inputUsuario = document.getElementById('usuario');
  const inputClave = document.getElementById('clave');

  let usuarios = [];

  // Cargamos los usuarios desde el archivo JSON 
  fetch('https://raw.githubusercontent.com/TatianaLovera/paginaWebNoticias/main/datos/usuarios.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo obtener el archivo de usuarios desde GitHub');
      }
      return response.json();
    })
    .then(data => {
      usuarios = data;
    })
    .catch(error => {
      console.error('Error al cargar el archivo de usuarios:', error);
      alert('Hubo un problema al cargar los usuarios. Por favor intentá más tarde.');
    });

  // Manejo del envio del formulario
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const usuarioIngresado = inputUsuario.value.trim();
    const claveIngresada = inputClave.value.trim();

    const usuarioEncontrado = usuarios.find(
      u => u.usuario === usuarioIngresado && u.clave === claveIngresada
    );

    if (usuarioEncontrado) {
      const rol = usuarioEncontrado.rol;

      alert(`Bienvenido, ${usuarioIngresado}! Rol: ${rol}`);

      sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));
      window.location.href = 'index.html';
    } else {
      alert('Usuario o contraseña incorrectos.');
      inputUsuario.value = "";
      inputClave.value = "";
    }
  });
  const toggleBtn = document.getElementById('toggleClave');
  const claveInput = document.getElementById('clave');

  toggleBtn.addEventListener('click', function () {
    const tipoActual = claveInput.getAttribute('type');
    claveInput.setAttribute('type', tipoActual === 'password' ? 'text' : 'password');
    toggleBtn.textContent = tipoActual === 'password' ? '🙈' : '👁️';
  });

});
