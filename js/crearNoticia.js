// Obtener botón cancelar y asignar evento para redireccionar a index.html
const cancelBoton = document.getElementById('cancelarRegistro');
cancelBoton.addEventListener('click', function() {
    window.location.href = "index.html";
});

// Obtener botón crear noticia y asignar evento para procesar el formulario
const crearBoton = document.getElementById('crearNoticia');
crearBoton.addEventListener('click', guardarDatos);

// Función principal para validar y "guardar" los datos de la noticia
function guardarDatos(event) {
    event.preventDefault();  // Evitar envío del formulario

    // Obtener valores de los campos del formulario
    const titulo = document.getElementById('titulo').value.trim();
    const resumen = document.getElementById('resumen').value.trim();
    const contenido = document.getElementById('contenido').value.trim();
    const categoria = document.getElementById('categoria').value.trim();

    // Validación: campos obligatorios
    if (!titulo || !resumen || !contenido || !categoria) {
        alert('Por favor, completá todos los campos obligatorios.');
        return; // No continúa si falta algún dato
    }

    // Simulación de datos extra que debemos agregar
    const usuario = JSON.parse(sessionStorage.getItem('usuario')) || { usuario: "Anónimo" };
    const autor = usuario.usuario;

    // Obtenemos nuevo ID simulado (del sesionStorage, si no existe es 1)
    const id = obtenerNuevoId();

    // Fecha actual en formato ISO (yyyy-mm-dd)
    const fecha = new Date().toISOString().split('T')[0];

    // Estado fijo "pendiente"
    const estado = "pendiente";

    // Crear objeto noticia con todos los datos
    const nuevaNoticia = {
        id: id,
        titulo: titulo,
        resumen: resumen,
        contenido: contenido,
        categoria: categoria,
        autor: autor,
        fecha: fecha,
        estado: estado
    };

    // Simulación de guardado: llamamos a esta función que no hace nada 8al momento)
    registrarNoticia(nuevaNoticia);

    // Muestra mensaje de éxito
    alert('¡Noticia creada exitosamente! Será revisada por un administrador.');

    // Redireccionar a index.html 
    window.location.href = "index.html";
}

// Función para obtener nuevo id simulado (incremental)
function obtenerNuevoId() {
    let ultimoId = parseInt(localStorage.getItem("ultimoId")) || 0;
    return ultimoId + 1;
}

// Función simulada que no hace nada con la noticia
function registrarNoticia(noticia) {
    // Aquí debería guardarse la noticia en el almacenamiento
    // Por ahora no hace nada
}
