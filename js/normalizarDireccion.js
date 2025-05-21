
function normalizarDireccion() {
    const direccion = document.getElementById('direccion').value.trim();

    const avisoDatosIncompletos =  document.getElementById('avisoDatosIncompletos');
    
    const direccionValida = /^.+\s+\d+,\s+.+$/;

    if(!direccion || !direccionValida.test(direccion)){

        avisoDatosIncompletos.style.display = 'block';
        avisoDatosIncompletos.textContent = 'Verifique que la direccion ingreasada tenga este formato "calle falsa 123, Municipio"';
        return;
    }else{
        avisoDatosIncompletos.style.display = 'none';
    }

    const url = `https://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${encodeURIComponent(direccion)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrarResultados(data, 'direccion');
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function mostrarResultados(data, campo) {
    // Obtener el contenedor donde se mostrarán los resultados según el campo (por ejemplo: 'direccion')
    const resultadosDiv = document.getElementById(`resultados${campo.charAt(0).toUpperCase() + campo.slice(1)}`);
    resultadosDiv.innerHTML = ''; // Limpiar resultados anteriores

    // Verificar que haya direcciones normalizadas en la respuesta del servidor
    if (data && data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
        // Crear una lista no ordenada para mostrar las direcciones
        const listaDirecciones = document.createElement('ul');

        // Recorrer cada dirección sugerida
        data.direccionesNormalizadas.forEach(direccion => {
            const elementoLista = document.createElement('li');
            elementoLista.textContent = `${direccion.direccion}`; // Mostrar la dirección en texto

            // Si la dirección tiene coordenadas, las guardamos como atributos data para reutilizar desde otro JS
            if (direccion.coordenadas && direccion.coordenadas.x && direccion.coordenadas.y) {
                const lat = direccion.coordenadas.y; // Latitud (Y)
                const lon = direccion.coordenadas.x; // Longitud (X)

                // Guardar coordenadas en atributos data para usarlas desde crear-noticia.js
                elementoLista.setAttribute('data-lat', lat);
                elementoLista.setAttribute('data-lon', lon);

                // También podés loguearlo para verificar
                console.log("Coordenada X (lon): " + lon + " - Coordenada Y (lat): " + lat);
            }

            // Cambiar cursor para que se note que es clickeable
            elementoLista.style.cursor = 'pointer';

            // Al hacer clic en una dirección, se completa el input y se oculta la lista
            elementoLista.onclick = () => {
                document.getElementById(campo).value = direccion.direccion; // Setear dirección seleccionada
                listaDirecciones.style.display = 'none'; // Ocultar lista

                // Evento personalizado que puede ser capturado por otros scripts (crear-noticia.js)
                const eventoSeleccion = new CustomEvent('direccionSeleccionada', {
                    detail: {
                        direccion: direccion.direccion,
                        lat: direccion.coordenadas?.y,
                        lon: direccion.coordenadas?.x
                    }
                });
                document.dispatchEvent(eventoSeleccion);
            };

            // Agregar la dirección como elemento de la lista
            listaDirecciones.appendChild(elementoLista);
        });

        // Insertar la lista completa en el contenedor
        resultadosDiv.appendChild(listaDirecciones);
    } else {
        // Si no se encontraron resultados, mostrar mensaje
        resultadosDiv.textContent = 'No se encontraron direcciones similares.';
    }
}

function eliminarDirecciones(){
    const resultadosDiv = document.getElementById("resultadosDireccion");
    resultadosDiv.innerHTML = '';
}