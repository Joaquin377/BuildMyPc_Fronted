document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid-productos');
    if (typeof productosDB === 'undefined' || !grid) return;

    function cargarCatalogoCompleto() {
        let listaGlobal = [];
        Object.keys(productosDB).forEach(categoria => {
            listaGlobal = listaGlobal.concat(productosDB[categoria]);
        });
        
        grid.innerHTML = listaGlobal.map(prod => `
            <article class="card-producto">
                <h3>${prod.nombre}</h3>
                <p class="detalles">Especificación técnica: ${prod.socket || prod.watts + 'W' || prod.tdp + 'W'}</p>
                <div class="precio">$ ${prod.precio.toLocaleString('es-CL')}</div>
                <a href="detalle.html?id=${prod.id}" class="boton-principal" style="display:block; text-align:center; text-decoration:none;">Inspeccionar Componente</a>
            </article>
        `).join('');
    }

    cargarCatalogoCompleto();
});