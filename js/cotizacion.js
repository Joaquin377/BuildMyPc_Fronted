document.addEventListener('DOMContentLoaded', () => {
    const tablaBody = document.querySelector('.tabla-cotizacion tbody');
    const totalDOM = document.getElementById('cotizacion-total');
    
    const dataGuardada = localStorage.getItem('buildTemporal');
    if (!dataGuardada || !tablaBody) return;

    const build = JSON.parse(dataGuardada);
    const piezas = [build.cpu, build.mobo, build.gpu, build.psu].filter(item => item !== null && item !== undefined);

    tablaBody.innerHTML = piezas.map(pieza => `
        <tr>
            <td>${pieza.nombre}</td>
            <td>1</td>
            <td>$ ${pieza.precio.toLocaleString('es-CL')}</td>
        </tr>
    `).join('');

    if (totalDOM) {
        totalDOM.textContent = `$ ${build.precioTotal.toLocaleString('es-CL')}`;
    }
});