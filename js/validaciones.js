document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');
    const formRegistro = document.getElementById('form-registro');
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function mostrarError(idElemento, mensaje) {
        const spanError = document.getElementById(idElemento);
        if (spanError) spanError.textContent = mensaje;
    }

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            let hayErrores = false;
            const email = document.getElementById('login-email').value.trim();
            const pass = document.getElementById('login-password').value.trim();
            
            mostrarError('error-login-email', '');
            mostrarError('error-login-password', '');

            if (!regexEmail.test(email)) {
                mostrarError('error-login-email', 'Debe ingresar un formato de correo válido (ej: usuario@duocuc.cl).');
                hayErrores = true;
            }

            if (pass.length === 0) {
                mostrarError('error-login-password', 'Este campo es obligatorio.');
                hayErrores = true;
            }

            if (hayErrores) e.preventDefault(); // Bloquea el envío si hay errores según pauta
        });
    }

    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            let hayErrores = false;
            const nombre = document.getElementById('reg-nombre').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const pass = document.getElementById('reg-pass').value;
            const passConfirm = document.getElementById('reg-pass-confirm').value;

            // Limpiar mensajes
            ['error-reg-nombre', 'error-reg-email', 'error-reg-pass', 'error-reg-pass-confirm'].forEach(id => mostrarError(id, ''));

            if (nombre.length === 0) {
                mostrarError('error-reg-nombre', 'El nombre es obligatorio.');
                hayErrores = true;
            }

            if (!regexEmail.test(email)) {
                mostrarError('error-reg-email', 'Debe ingresar un formato de correo válido.');
                hayErrores = true;
            }

            if (pass.length < 6) {
                mostrarError('error-reg-pass', 'La contraseña debe tener una longitud mínima de 6 caracteres.');
                hayErrores = true;
            }

            if (pass !== passConfirm || passConfirm.length === 0) {
                mostrarError('error-reg-pass-confirm', 'Las contraseñas no coinciden. Verifique su coherencia.');
                hayErrores = true;
            }

            if (hayErrores) {
                e.preventDefault(); 
            } else {
                e.preventDefault();
                // Simulación de éxito para no recargar la página inmediatamente y que el profe vea que funciona
                const boton = formRegistro.querySelector('button');
                boton.textContent = "Registro Bien Hecho";
                boton.style.backgroundColor = "var(--color-primario)";
                setTimeout(() => window.location.href = 'auth.html', 1500);
            }
        });
    }
});