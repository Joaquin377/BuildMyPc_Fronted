const contenedor = document.getElementById("contenedor-builds");

buildsDestacadas.forEach(build => {

    const tarjeta = document.createElement("article");

    tarjeta.classList.add("tarjeta-build");

    tarjeta.innerHTML = `
        <h3>${build.nombre}</h3>

        <p><strong>Procesador:</strong> ${build.procesador}</p>

        <p><strong>Gráfica:</strong> ${build.grafica}</p>

        <p><strong>RAM:</strong> ${build.ram}</p>

        <p><strong>Precio:</strong> $${build.precio.toLocaleString("es-CL")}</p>

        <a href="armador.html" class="boton-principal">
            Ver configuración
        </a>
    `;

    contenedor.appendChild(tarjeta);
});

