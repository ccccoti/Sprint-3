const bars = document.querySelector('.bars');
// Bars Nav
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
const container = document.querySelector('.cotizacion');

function getDatos() {
  container.innerHTML = '';
  fetch(url)
    .then(data => data.json())
    .then(elems => elems.filter(elem => elem.casa.venta !== '0'))
    .then(elems => elems.filter(elem => elem.casa.variacion !== undefined))
    .then(res => {
      let b = 1;
      res.forEach(elem => {
        let div = `
      <div class="cotizacion-card">
        <div class="cotizacion-header">
          <div class="cotizacion-icon">
            <img src="img\\cotizacion\\b${b}.png" alt="" />
          </div>
          <h3 class="cotizacion-titulo">${elem.casa.nombre}</h3>
        </div>
        <div class="cotizacion-body">
      `;
        b++;

        if (elem.casa.compra !== 'No Cotiza') {
          div += `<p>COMPRA: $${elem.casa.compra}</p>`;
        }

        div += `
          <P>VENTA: $${elem.casa.venta}</P>
        </div>
        <div class="cotizacion-footer">
          <P>VARIACIÓN: ${elem.casa.variacion}%</P>
        </div>
      </div>
      `;
        container.innerHTML += div;
      });
    });
}
getDatos();

const cotizacionBtn = document.querySelector('.cotizacion-btn');
cotizacionBtn.addEventListener('click', () => getDatos());