document.addEventListener('DOMContentLoaded', () => {
    const selectCpu = document.getElementById('select-cpu');
    const selectMobo = document.getElementById('select-mobo');
    const selectGpu = document.getElementById('select-gpu');
    const selectPsu = document.getElementById('select-psu');
    const btnGuardar = document.getElementById('btn-guardar-cotizacion');

    if (!selectCpu || typeof productosDB === 'undefined') return;

    function poblar(select, lista) {
        select.innerHTML = '<option value="">-- Seleccione un componente --</option>';
        lista.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.id;
            opt.textContent = `${item.nombre} - $${item.precio.toLocaleString('es-CL')}`;
            select.appendChild(opt);
        });
    }

    poblar(selectCpu, productosDB.cpus);
    poblar(selectMobo, productosDB.motherboards);
    poblar(selectGpu, productosDB.gpus);
    poblar(selectPsu, productosDB.psus);

    function evaluarConfiguracion() {
        const cpu = productosDB.cpus.find(c => c.id === selectCpu.value);
        const mobo = productosDB.motherboards.find(m => m.id === selectMobo.value);
        const gpu = productosDB.gpus.find(g => g.id === selectGpu.value);
        const psu = productosDB.psus.find(p => p.id === selectPsu.value);

        let validacionExitosa = true;
        let tdpTotal = (cpu ? cpu.tdp : 0) + (gpu ? gpu.tdp : 0) + 40; // 40W base
        let wattsFuente = psu ? psu.watts : 0;
        let precioTotal = (cpu?.precio||0) + (mobo?.precio||0) + (gpu?.precio||0) + (psu?.precio||0);
        
        document.getElementById('val-tdp').textContent = `${tdpTotal} W`;
        document.getElementById('val-total').textContent = `$ ${precioTotal.toLocaleString('es-CL')}`;
        
        const msgCaja = document.getElementById('mensaje-compatibilidad');

        // Validar coherencia de Sockets
        if (cpu && mobo && cpu.socket !== mobo.socket) {
            msgCaja.className = "alerta-box error";
            msgCaja.textContent = `Error crítico: El procesador usa socket ${cpu.socket} y la placa ${mobo.socket}. No ensamblarán.`;
            validacionExitosa = false;
        } 
        // Validar rango numérico de potencia
        else if (psu && tdpTotal > wattsFuente) {
            msgCaja.className = "alerta-box error";
            msgCaja.textContent = `Error de rango numérico: El consumo (${tdpTotal}W) supera la capacidad de la fuente (${wattsFuente}W).`;
            validacionExitosa = false;
        } 
        else if (cpu && mobo && gpu && psu) {
            msgCaja.className = "alerta-box success";
            msgCaja.textContent = `Configuración validada exitosamente. Total: $ ${precioTotal.toLocaleString('es-CL')}`;
        } else {
            msgCaja.className = "alerta-box info";
            msgCaja.textContent = "Seleccione todos los componentes para validar las reglas de compatibilidad.";
            validacionExitosa = false;
        }

        return { build: { cpu, mobo, gpu, psu, precioTotal }, esValido: validacionExitosa };
    }

    [selectCpu, selectMobo, selectGpu, selectPsu].forEach(s => s.addEventListener('change', evaluarConfiguracion));

    btnGuardar.addEventListener('click', (e) => {
        const resultado = evaluarConfiguracion();
        if (!resultado.esValido) {
            e.preventDefault(); // Bloquea el envío si existen errores (Requisito EP1)
            document.getElementById('mensaje-compatibilidad').textContent += " (Corrija los errores antes de cotizar)";
        } else {
            localStorage.setItem('buildTemporal', JSON.stringify(resultado.build));
            window.location.href = 'cotizacion.html';
        }
    });
});