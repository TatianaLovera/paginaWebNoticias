document.addEventListener('DOMContentLoaded', () => {
  let tiempo = 5;
  const spanTiempo = document.getElementById('tiempo');

  const intervalo = setInterval(() => {
    tiempo--;
    spanTiempo.textContent = tiempo;
    if (tiempo <= 0) {
      clearInterval(intervalo);
      window.location.href = 'index.html';
    }
  }, 1000);
});
