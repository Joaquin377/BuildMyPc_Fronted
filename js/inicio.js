document.addEventListener('DOMContentLoaded', () => {
    const contenedorBuilds = document.getElementById('contenedor-builds');

    // Ejemplos de builds recomendadas
    const buildsDestacadas = [
        {
            nombre: 'Build Entry Gamer',
            cpu: 'AMD Ryzen 5 5600X',
            gpu: 'NVIDIA RTX 3060 12GB',
            precio: '$ 565.000',
            score: '70/100'
        },
        {
            nombre: 'Build High Performance',
            cpu: 'AMD Ryzen 7 7800X3D',
            gpu: 'NVIDIA RTX 4070 SUPER 12GB',
            precio: '$ 1.320.000',
            score: '92/100'
        },
        {
            nombre: 'Build Ultra Streamer',
            cpu: 'Intel Core i7-13700K',
            gpu: 'AMD Radeon RX 7800 XT',
            precio: '$ 1.180.000',
            score: '88/100'
        }
    ];

    if (contenedorBuilds) {
        contenedorBuilds.innerHTML = buildsDestacadas.map(build => `
            <article class="tarjeta-build" style="background-color: var(--color-superficie); border: 1px solid var(--color-borde); border-radius: var(--radio-borde); padding: 20px;">
                <h3 style="color: var(--color-acento); margin-bottom: 10px;">${build.nombre}</h3>
                <p><strong>Procesador:</strong> ${build.cpu}</p>
                <p><strong>Tarjeta Gráfica:</strong> ${build.gpu}</p>
                <p style="margin-top: 10px; font-weight: bold; color: var(--color-primario);">Puntaje: ${build.score}</p>
                <p style="font-size: 1.2rem; font-weight: bold; margin-top: 5px;">${build.precio}</p>
                <a href="armador.html" class="boton-principal" style="display: block; text-align: center; margin-top: 15px;">Cargar Build</a>
            </article>
        `).join('');
    }
});
