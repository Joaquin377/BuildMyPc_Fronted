document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor-builds');

    const buildsDestacadas = [
        {
            nombre: "PC Gamer Básico",
            procesador: "AMD Ryzen 5",
            grafica: "RTX 4060",
            ram: "16 GB",
            precio: 850000
        },
        {
            nombre: "PC Gamer Avanzado",
            procesador: "Intel Core i7",
            grafica: "RTX 4070",
            ram: "32 GB",
            precio: 1400000
        },
        {
            nombre: "PC Gamer Pro",
            procesador: "AMD Ryzen 7",
            grafica: "RTX 4080",
            ram: "32 GB",
            precio: 1900000
        }
    ];

    if (contenedor) {
        contenedor.innerHTML = buildsDestacadas.map(build => `
            <article class="card-producto">
                <h3>${build.nombre}</h3>
                <p><strong>Procesador:</strong> ${build.procesador}</p>
                <p><strong>Tarjeta Gráfica:</strong> ${build.grafica}</p>
                <p><strong>Memoria RAM:</strong> ${build.ram}</p>
                <div class="precio" style="margin-top: 15px; font-weight: bold; color: var(--color-acento);">
                    $ ${build.precio.toLocaleString('es-CL')}
                </div>
                <a href="armador.html" class="boton-principal" style="display: block; text-align: center; margin-top: 15px; font-size: 0.9rem; text-decoration: none;">
                    Cargar Configuración
                </a>
            </article>
        `).join('');
    }
});