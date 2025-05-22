document.addEventListener('DOMContentLoaded', () => {

    const cancelBoton = document.getElementById('cancelarRegistro');
    cancelBoton.addEventListener('click', function () {
        window.location.href = "index.html";
    });

    const crearBoton = document.getElementById('crearNoticia');
    crearBoton.addEventListener('click', guardarDatos);

    const inputDireccion = document.getElementById('direccion');
    const mapaContainer = document.getElementById('contenedor-mapa');
    let mapa = null;
    let marcador = null;

    // Manejo del formulario para crear noticia
    function guardarDatos(event) {
        event.preventDefault();  // Evitar envío del formulario

        const titulo = document.getElementById('titulo').value.trim();
        const resumen = document.getElementById('resumen').value.trim();
        const contenido = document.getElementById('contenido').value.trim();
        const categoria = document.getElementById('categoria').value.trim();

        if (!titulo || !resumen || !contenido || !categoria) {
            alert('Por favor, completá todos los campos obligatorios.');
            return; // No continua si falta algun dato
        }

        const usuario = JSON.parse(sessionStorage.getItem('usuario')) || { usuario: "Anónimo" };
        const autor = usuario.usuario;

        const id = obtenerNuevoId();

        // Fecha actual en formato ISO (yyyy-mm-dd)
        const fecha = new Date().toISOString().split('T')[0];

        // Estado fijo "pendiente"
        const estado = "pendiente";

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

        // Simulacion de guardado: llamamos a esta función que no hace nada al momento)
        registrarNoticia(nuevaNoticia);
        alert('¡Noticia creada exitosamente! -Pendiente de publicación- ');
        window.location.href = "index.html";
    }

    //  Para obtener nuevo id simulado (incremental)
    function obtenerNuevoId() {
        let ultimoId = parseInt(localStorage.getItem("ultimoId")) || 0;
        return ultimoId + 1;
    }

    // Funcion simulada que no hace nada con la noticia
    function registrarNoticia(noticia) {
        // Se tendria que guardar la noticia en el almacenamiento, pero por ahora no hace nada
    }

    // Para mostrar el mapa con un marcador en las coordenadas dadas
    function mostrarMapa(lat, lon) {
        try {
            mapaContainer.style.display = 'block';
            document.querySelector('main.contenedor-formulario').classList.add('dos-columnas'); // para dividir pantalla

            if (!mapa) {
                mapa = L.map('mapa').setView([lat, lon], 16);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '© OpenStreetMap'
                }).addTo(mapa);
            } else {
                mapa.setView([lat, lon], 16);
            }

            if (marcador) {
                mapa.removeLayer(marcador);
            }

            marcador = L.marker([lat, lon]).addTo(mapa);
        } catch (error) {
            console.error('Error al cargar el mapa:', error);
            alert('No se pudo conectar con el servidor de mapas. Intente nuevamente más tarde.');
        }
    }

    document.addEventListener('direccionSeleccionada', (e) => {
        const { lat, lon } = e.detail;

        if (lat && lon) {
            mostrarMapa(lat, lon);
        } else {
            alert('No se pudo obtener la ubicación de la dirección seleccionada.');
        }
    });

    inputDireccion.addEventListener('input', () => {
        if (!inputDireccion.value.trim()) {
            mapaContainer.style.display = 'none';
            document.getElementById('contenedorCrear').classList.remove('dos-columnas');
        }
    });
});

