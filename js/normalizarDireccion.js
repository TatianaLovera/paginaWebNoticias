
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
    const resultadosDiv = document.getElementById(`resultados${campo.charAt(0).toUpperCase() + campo.slice(1)}`);
    resultadosDiv.innerHTML = '';

    if (data && data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
        const listaDirecciones = document.createElement('ul');
        data.direccionesNormalizadas.forEach(direccion => {
            const elementoLista = document.createElement('li');
            elementoLista.textContent = `${direccion.direccion}`;

            if (direccion.coordenadas && direccion.coordenadas.x && direccion.coordenadas.y) {
                x_cooredenada = direccion.coordenadas.y;
                y_cooredenada = direccion.coordenadas.x;

                console.log("Cooredenada X: "+ x_cooredenada+"Coordena Y: "+y_cooredenada );
            
            }
            elementoLista.style.cursor = 'pointer';
            elementoLista.onclick = () => {
                document.getElementById(campo).value = direccion.direccion;
                listaDirecciones.style.display = 'none';
            };
            listaDirecciones.appendChild(elementoLista);
        });
        resultadosDiv.appendChild(listaDirecciones);
    } else {
        resultadosDiv.textContent = 'No se encontraron direcciones similares.';
    }
}

function eliminarDirecciones(){
    const resultadosDiv = document.getElementById("resultadosDireccion");
    resultadosDiv.innerHTML = '';
}