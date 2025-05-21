
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
    // Obtenemos el contenedor donde se van a mostrar los resultados segun el campo (por ejemplo: "direccion")
    const resultadosDiv = document.getElementById(`resultados${campo.charAt(0).toUpperCase() + campo.slice(1)}`);
    resultadosDiv.innerHTML = ''; 

    // Verificamos que haya direcciones normalizadas en la respuesta del servidor
    if (data && data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
        const listaDirecciones = document.createElement('ul');

        // Se recorre cada direccion sugerida
        data.direccionesNormalizadas.forEach(direccion => {
            const elementoLista = document.createElement('li');
            elementoLista.textContent = `${direccion.direccion}`; // Se muestra la direccion en texto

            // Si la direccion tiene coordenadas, las guardamos como atributos data para reutilizar desde otro JS
            if (direccion.coordenadas && direccion.coordenadas.x && direccion.coordenadas.y) {
                const lat = direccion.coordenadas.y; // Latitud (Y)
                const lon = direccion.coordenadas.x; // Longitud (X)

                // Guardamos las coordenadas en atributos data para usarlas desde crear-noticia.js
                elementoLista.setAttribute('data-lat', lat);
                elementoLista.setAttribute('data-lon', lon);

                // Tambien se puede loguear para verificar
                console.log("Coordenada X (lon): " + lon + " - Coordenada Y (lat): " + lat);
            }

            // Cambiamos el cursor para que se note que se puede hacer click
            elementoLista.style.cursor = 'pointer';

            // Al hacer clic en una direccion, se completa el input y se oculta la lista
            elementoLista.onclick = () => {
                document.getElementById(campo).value = direccion.direccion; 
                listaDirecciones.style.display = 'none';

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

            // Agregamos la direccion como elemento de la lista
            listaDirecciones.appendChild(elementoLista);
        });

        // Insertamos la lista completa en el contenedor
        resultadosDiv.appendChild(listaDirecciones);
    } else {
        resultadosDiv.textContent = 'No se encontraron direcciones similares.';
    }
}

function eliminarDirecciones(){
    const resultadosDiv = document.getElementById("resultadosDireccion");
    resultadosDiv.innerHTML = '';
}