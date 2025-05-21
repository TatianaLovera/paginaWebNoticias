document.addEventListener('DOMContentLoaded', function () {
  // Obtener parámetros de la URL (por ejemplo ?id=1)
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
          // Cargar datos en la página
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

  // --- Manejo login para mostrar formulario o mensaje ---

  // Recupera el usuario logueado desde sessionStorage (puede ser null si no está logueado)
  const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuarioLogueado'));

  if (usuarioLogueado) {
    // Usuario logueado: mostrar el formulario para dejar preguntas/comentarios
    document.getElementById('formComentario').style.display = 'block';
    document.getElementById('mensajeLogin').style.display = 'none';
  } else {
    // Usuario no logueado: mostrar mensaje para invitar a iniciar sesión
    document.getElementById('formComentario').style.display = 'none';
    document.getElementById('mensajeLogin').style.display = 'block';
  }

  // --- Manejo del envío de preguntas ---

  document.getElementById('enviarComentario').addEventListener('click', (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página (si fuera un <form>)

    const texto = document.getElementById('comentarioTexto').value.trim();

    if (texto !== '') {
      // Mostrar alerta que confirma el envío
      alert("Pregunta enviada con éxito.  -Pendiente de publicación-");

      // Limpiar el textarea para poder hacer otra pregunta
      document.getElementById('comentarioTexto').value = '';

      // Asegurar que el formulario siga visible y el mensaje de login oculto
      document.getElementById('formComentario').style.display = 'block';
      document.getElementById('mensajeLogin').style.display = 'none';
    } else {
      alert("Por favor, escribí tu pregunta antes de enviarla.");
    }
  });
});
