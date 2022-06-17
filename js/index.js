// Bars Nav
const bars = document.querySelector('.bars');
const navLinks = document.querySelector('.nav-links');
const navBtns = document.querySelector('.nav-btns');

bars.addEventListener('click', () => {
  if (navLinks.classList.contains('links-active')) {
    bars.classList.remove('bars-active');
    navLinks.classList.remove('links-active');
    navBtns.classList.remove('btns-active');
    return;
  }

  bars.classList.add('bars-active');
  navLinks.classList.add('links-active');
  navBtns.classList.add('btns-active');
});

// Cotizaciones
const url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
const cotizacionCards = document.querySelectorAll('.cotizacion-card');

function insertDatos(div, texto) {
  // Se simula la actualización de datos aunque sean iguales
  div.textContent = '';
  setTimeout(() => div.textContent = texto, 500);
}

function insertFlecha(flecha, variacion) {
  // Se eliminan las clases anteriores
  flecha.classList = 'cotizacion-flecha';
  setTimeout(() => {
    // Se checkea el signo de la variación
    variacion[0] !== '-'
      ? flecha.classList.add('subida')
      : flecha.classList.add('bajada');
  }, 500);
}

function getDatos() {
  fetch(url)
    .then(data => data.json())
    // Filtra los resultados que no se necesitan
    .then(res => res.filter(elem =>
      elem.casa.variacion && elem.casa.venta != '0'))
    // Agrega lo obtenido al HTML
    .then(res => {
      cotizacionCards.forEach((elem, i) => {
        const cotizacionCompra = elem.querySelector('.cotizacion-compra');
        const cotizacionVenta = elem.querySelector('.cotizacion-venta');
        const cotizacionVariacion = elem.querySelector('.cotizacion-variacion');
        const cotizacionFlecha = elem.querySelector('.cotizacion-flecha');

        if (cotizacionCompra) {
          insertDatos(cotizacionCompra, `$${res[i].casa.compra}`);
        }
        if (cotizacionVenta) {
          insertDatos(cotizacionVenta, `$${res[i].casa.venta}`);
        }
        insertDatos(cotizacionVariacion, `${res[i].casa.variacion}%`);

        insertFlecha(cotizacionFlecha, res[i].casa.variacion);
      });
    });
}
getDatos();

const cotizacionBtn = document.querySelector('.cotizacion-btn');
cotizacionBtn.addEventListener('click', getDatos);