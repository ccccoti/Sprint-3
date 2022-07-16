// Cotizaciones
const cotizacionBtn = document.querySelector('.cotizacion-btn');
cotizacionBtn.addEventListener('click', () => {
  cotizacionBtn.disabled = true;
  getDatos();
  setTimeout(insertUpdate, 1000);
});

const url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
const cotizacionCards = document.querySelectorAll('.cotizacion-card');

function insertFlecha(flecha, variacion) {
  // Se eliminan las clases anteriores
  flecha.classList = 'cotizacion-flecha';
  // Se checkea el signo de la variación
  variacion[0] !== '-'
    ? flecha.classList.add('subida')
    : flecha.classList.add('bajada');
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
          cotizacionCompra.textContent = `$${res[i].casa.compra}`;
        }
        if (cotizacionVenta) {
          cotizacionVenta.textContent = `$${res[i].casa.venta}`;
        }
        cotizacionVariacion.textContent = `${res[i].casa.variacion}%`;

        insertFlecha(cotizacionFlecha, res[i].casa.variacion);
        setTimeout(() => cotizacionBtn.disabled = false, 500);
      });
    });
}
getDatos();

const body = document.querySelector('body');
// Inserta la notificación de actualización
function insertUpdate() {
  const div = document.createElement('div');

  div.classList.add('cotizacion-actualizada');
  div.style.bottom = '-2.5rem';
  div.innerHTML = `
    <p>Cotización Actualizada</p>
  `;
  body.append(div);
  div.classList.add('slide-in-right');

  subirDivs();
  setTimeout(() => div.remove(), 3500);
}
// Cambia la posición de los divs cada vez que se agrega uno
function subirDivs() {
  const divs = body.querySelectorAll('.cotizacion-actualizada');
  divs.forEach(elem => {
    const bottom = parseFloat(elem.style.bottom);
    elem.style.bottom = `${bottom + 3}rem`;
  });
}
