// js/noticia-pdte.js
document.addEventListener('DOMContentLoaded', () => {
  // Obtener el índice de la noticia desde los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const indice = parseInt(params.get('indice'));

  // Cargar noticias desde el archivo JSON
  fetch('../datos/noticias.json')
    .then(response => response.json())
    .then(data => {
      const noticia = data.filter(n => n.estado === 'pendiente')[indice];

      if (!noticia) {
        document.querySelector('.detalle-noticia').innerHTML = '<p>No se encontró la noticia.</p>';
        return;
      }

      // Mostrar contenido de la noticia
      document.getElementById('tituloNoticia').textContent = noticia.titulo;
      document.getElementById('fechaNoticia').textContent = noticia.fecha;
      document.getElementById('imagenNoticia').src = `../${noticia.imagen || 'imagenes/logoMuni.jpg'}`;
      document.getElementById('imagenNoticia').onerror = function () {
        this.src = '../imagenes/imagenEnCasoDeError.jpg';
      };
      document.getElementById('contenidoNoticia').textContent = noticia.contenido;
      document.getElementById('autorNoticia').textContent = noticia.autor;
      document.getElementById('categoriaNoticia').textContent = noticia.categoria;

      if (noticia.direccion) {
        const direccion = document.getElementById('direccionNoticia');
        direccion.style.display = 'block';
        direccion.querySelector('span').textContent = noticia.direccion;
      }

      // Botones de acción
      document.querySelector('.publicar').addEventListener('click', () => {
        alert(`La noticia "${noticia.titulo}" fue publicada.`);
        window.location.href = 'noticias-pendientes.html';
      });

      document.querySelector('.rechazar').addEventListener('click', () => {
        alert(`La noticia "${noticia.titulo}" fue rechazada.`);
        window.location.href = 'noticias-pendientes.html';
      });
    })
    .catch(error => {
      console.error('Error al cargar la noticia:', error);
    });

  // =============================
  // LÓGICA PARA MENÚ DE USUARIO
  // =============================

  const nombreUsuario = sessionStorage.getItem("usuarioNombre") || "Administrador";
  const loginBtn = document.getElementById("loginBtn");

  loginBtn.textContent = `${nombreUsuario} ▾`;

  loginBtn.addEventListener("click", () => {
    const menu = document.getElementById("menuOpciones");
    menu.classList.toggle("oculto");
  });

  // Cierra el menú si se hace clic afuera
  document.addEventListener("click", (e) => {
    const menu = document.getElementById("menuOpciones");
    if (!loginBtn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add("oculto");
    }
  });
});