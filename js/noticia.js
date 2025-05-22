document.addEventListener('DOMContentLoaded', function () {
  // Obtenemos parametros de la url (por ejemplo id 1)
  const params = new URLSearchParams(window.location.search);
  const idNoticia = params.get('id');

  console.log("ID noticia:", idNoticia);

  if (idNoticia) {
    fetch('https://raw.githubusercontent.com/TatianaLovera/paginaWebNoticias/main/datos/noticias.json')
      .then(response => response.json())
      .then(data => {
        const noticia = data.find(n => n.id === parseInt(idNoticia));
        console.log("Noticia encontrada:", noticia);

        if (noticia) {
          document.getElementById('tituloNoticia').textContent = noticia.titulo;
          document.getElementById('categoriaNoticia').textContent = noticia.categoria;
          document.getElementById('resumenNoticia').textContent = noticia.resumen;
          document.getElementById('contenidoNoticia').textContent = noticia.contenido;

          if (noticia.imagen && noticia.imagen.trim() !== "") {
            const img = document.getElementById('imagenNoticia');
            img.src = noticia.imagen;
            img.style.display = 'block';
          }

          const x = parseFloat(noticia["coord-x"]);
          const y = parseFloat(noticia["coord-y"]);

          console.log("Coordenadas x, y:", x, y);

          const coordenadasValidas = (
            !isNaN(x) && !isNaN(y) &&
            x !== 0 && y !== 0 &&
            x !== "" && y !== ""
          );

          if (coordenadasValidas) {
            const mapaDiv = document.getElementById('map');
            mapaDiv.style.display = 'block';

            const mapa = L.map('map').setView([y, x], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap contributors'
            }).addTo(mapa);

            L.marker([y, x]).addTo(mapa)
              .bindPopup('Ubicación de la noticia')
              .openPopup();
          } else {
            console.log("No hay coordenadas válidas para mostrar mapa.");
          }
        } else {
          alert('Noticia no encontrada.');
        }
      })
      .catch(error => {
        console.error('Error al obtener la noticia:', error);
      });
  } else {
    alert('No se especificó una noticia.');
  }

  // Preguntas en noticia
  const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuarioLogueado'));

  if (usuarioLogueado) {
    document.getElementById('formComentario').style.display = 'block';
    document.getElementById('mensajeLogin').style.display = 'none';
  } else {
    document.getElementById('formComentario').style.display = 'none';
    document.getElementById('mensajeLogin').style.display = 'block';
  }


  document.getElementById('enviarComentario').addEventListener('click', (event) => {
    event.preventDefault(); 

    const texto = document.getElementById('comentarioTexto').value.trim();

    if (texto !== '') {
      alert("Pregunta enviada con éxito.  -Pendiente de publicación-");
      document.getElementById('comentarioTexto').value = '';
      document.getElementById('formComentario').style.display = 'block';
      document.getElementById('mensajeLogin').style.display = 'none';
    } else {
      alert("Por favor, escribí tu pregunta antes de enviarla.");
    }
  });
});
