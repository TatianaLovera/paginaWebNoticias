document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const inputCorreo = document.getElementById('correo');
  const inputUsuario = document.getElementById('usuario');
  const btnRegistrar = document.querySelector('.btn-registrarse');
  const mensaje = document.createElement('p');
  mensaje.className = 'nota';
  form.appendChild(mensaje);

  let usuarios = [];
  let correoValido = false;
  let usuarioValido = false;

  // Cargar usuarios ya registrados
  fetch('../datos/usuarios.json')
    .then(response => response.json())
    .then(data => {
      usuarios = data;
    })
    .catch(error => {
      console.error('Error al cargar usuarios:', error);
    });

  // Validar correo en tiempo real
  inputCorreo.addEventListener('input', function () {
    const correo = inputCorreo.value.trim().toLowerCase();
    correoValido = !usuarios.some(u => u.correo && u.correo.toLowerCase() === correo);

    if (!correoValido) {
      mensaje.textContent = 'Este correo electrónico ya ha sido usado.';
    } else if (!usuarioValido) {
      mensaje.textContent = 'Este nombre de usuario ya ha sido usado.';
    } else {
      mensaje.textContent = '';
    }

    validarFormulario();
  });

  // Validar nombre de usuario en tiempo real
  inputUsuario.addEventListener('input', function () {
    const nombreUsuario = inputUsuario.value.trim().toLowerCase();
    usuarioValido = !usuarios.some(u => u.usuario && u.usuario.toLowerCase() === nombreUsuario);

    if (!usuarioValido) {
      mensaje.textContent = 'Este nombre de usuario ya ha sido usado.';
    } else if (!correoValido) {
      mensaje.textContent = 'Este correo electrónico ya ha sido usado.';
    } else {
      mensaje.textContent = '';
    }

    validarFormulario();
  });

  function validarFormulario() {
    btnRegistrar.disabled = !(correoValido && usuarioValido);
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!(correoValido && usuarioValido)) {
      return;
    }

    const nombre = document.getElementById('nombre').value.trim();
    const usuario = document.getElementById('usuario').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const clave = document.getElementById('clave').value.trim();
    const newsletter = document.getElementById('newsletter').checked;

    const nuevoUsuario = {
      nombre,
      usuario,
      dni,
      correo,
      clave,
      newsletter,
      rol: 'vecino'
    };

    console.log('Nuevo usuario registrado:', nuevoUsuario);
    alert('Registro exitoso. Podés iniciar sesión ahora.');
    window.location.href = '../login.html';
  });
});
