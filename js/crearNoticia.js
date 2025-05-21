document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM

    // Obtener botón cancelar y asignar evento para redireccionar a index.html
    const cancelBoton = document.getElementById('cancelarRegistro');
    cancelBoton.addEventListener('click', function() {
        window.location.href = "index.html";
    });

    // Obtener botón crear noticia y asignar evento para procesar el formulario
const crearBoton = document.getElementById('crearNoticia');
crearBoton.addEventListener('click', guardarDatos);

    const inputDireccion = document.getElementById('direccion');
    const mapaContainer = document.getElementById('contenedor-mapa'); // contenedor del mapa
    let mapa = null;
    let marcador = null;

    // Manejo del formulario para crear noticia
    
    


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
    alert('¡Noticia creada exitosamente! -Pendiente de publicación- ');

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
    /*=============================================================*/
}

    // Función para mostrar el mapa con un marcador en las coordenadas dadas
    function mostrarMapa(lat, lon) {
        try {
            // Mostrar el contenedor del mapa y cambiar el layout a dos columnas
            mapaContainer.style.display = 'block';
            document.querySelector('main.contenedor-formulario').classList.add('dos-columnas'); // para dividir pantalla

            if (!mapa) {
                // Crear mapa si no existe aún
                mapa = L.map('mapa').setView([lat, lon], 16);

                // Capa base con tiles
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '© OpenStreetMap'
                }).addTo(mapa);
            } else {
                // Si el mapa ya existe, solo cambiamos la vista
                mapa.setView([lat, lon], 16);
            }

            // Si ya hay un marcador, lo eliminamos
            if (marcador) {
                mapa.removeLayer(marcador);
            }

            // Agregar marcador en la ubicación seleccionada
            marcador = L.marker([lat, lon]).addTo(mapa);
        } catch (error) {
            console.error('Error al cargar el mapa:', error);
            alert('No se pudo conectar con el servidor de mapas. Intente nuevamente más tarde.');
        }
    }

    // Escuchamos el evento personalizado 'direccionSeleccionada' que viene desde normalizarDireccion.js
    document.addEventListener('direccionSeleccionada', (e) => {
        const { lat, lon } = e.detail;

        if (lat && lon) {
            mostrarMapa(lat, lon); // Mostrar mapa con coordenadas seleccionadas
        } else {
            alert('No se pudo obtener la ubicación de la dirección seleccionada.');
        }
    });

    // Si el usuario borra la dirección, se vuelve al layout centrado
    inputDireccion.addEventListener('input', () => {
        if (!inputDireccion.value.trim()) {
            mapaContainer.style.display = 'none';
            document.getElementById('contenedorCrear').classList.remove('dos-columnas');
        }
    });
});    

