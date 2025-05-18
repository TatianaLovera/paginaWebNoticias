// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form'); // Referencia al formulario de login
  const inputUsuario = document.getElementById('usuario'); // Campo de entrada para el nombre de usuario
  const inputClave = document.getElementById('clave');     // Campo de entrada para la contraseña

  let usuarios = []; // Lista que se llenará con los usuarios obtenidos del JSON

  // 1. Cargar los usuarios desde el archivo JSON alojado en GitHub
  fetch('https://raw.githubusercontent.com/TatianaLovera/paginaWebNoticias/main/datos/usuarios.json')
    .then(response => {
      // Verifica si la respuesta es correcta
      if (!response.ok) {
        throw new Error('No se pudo obtener el archivo de usuarios desde GitHub');
      }
      return response.json(); // Convierte la respuesta a JSON
    })
    .then(data => {
      usuarios = data; // Asigna los usuarios a la variable
    })
    .catch(error => {
      console.error('Error al cargar el archivo de usuarios:', error);
      alert('Hubo un problema al cargar los usuarios. Por favor intentá más tarde.');
    });

  // 2. Manejo del envío del formulario
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que se recargue la página

    const usuarioIngresado = inputUsuario.value.trim(); // Elimina espacios antes y después
    const claveIngresada = inputClave.value.trim();

    // 3. Buscar si existe un usuario con esos datos
    const usuarioEncontrado = usuarios.find(
      u => u.usuario === usuarioIngresado && u.clave === claveIngresada
    );

    if (usuarioEncontrado) {
      const rol = usuarioEncontrado.rol;

      // 4. Mensaje de bienvenida personalizado
      alert(`Bienvenido, ${usuarioIngresado}! Rol: ${rol}`);

      // 5. Guardar usuario en sessionStorage para que se recuerde en otras páginas
      sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));

      // 6. Redirigir al index luego del login exitoso
      window.location.href = 'index.html';
    } else {
      // 7. Mostrar mensaje de error si los datos no coinciden
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