document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const btnGuardar = document.querySelector('.btn-guardar-cambios');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const usuario = document.getElementById('usuario').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const clave = document.getElementById('clave').value.trim();
    const newsletter = document.getElementById('newsletter').checked;

    // Simulamos el guardado
    const usuarioActualizado = {
      nombre,
      usuario,
      correo,
      dni,
      clave,
      newsletter
    };

    console.log('Datos simulados guardados:', usuarioActualizado);

    alert('Los cambios se guardaron con éxito.');
    window.location.href = '../index.html';
  });
});
