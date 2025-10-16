// Espera a que todo el contenido de la página se cargue
document.addEventListener('DOMContentLoaded', function() {

    // ===================================================================
    //  CÓDIGO PARA LA PÁGINA DE INICIO DE SESIÓN (index.html)
    // ===================================================================
    const loginForm = document.getElementById('login-form');

    // Este bloque solo se ejecutará si encuentra el formulario de login en la página
    if (loginForm) {
        const usuarioInput = document.getElementById('usuario');
        const contrasenaInput = document.getElementById('contrasena');

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const usuario = usuarioInput.value;
            const contrasena = contrasenaInput.value;
            
            if (usuario === 'Rodrigo' && contrasena === '12345') {
                alert('¡Inicio de sesión exitoso!');
                window.location.href = 'bienvenida.html';
            } else {
                alert('Usuario o contraseña incorrectos.');
            }
        });
    }

  // ===================================================================
//  CÓDIGO PARA LA PÁGINA DE BIENVENIDA (bienvenida.html)
// ===================================================================
const avatarInteractiveArea = document.querySelector('.avatar-interactive-area');

// Este bloque solo se ejecutará si encuentra el área del avatar en la página
if (avatarInteractiveArea) {
    const detailsSection = document.getElementById('details-section'); // Seleccionamos la nueva sección
    const infoBoxes = document.querySelectorAll('.info-box');

    const showInfo = () => {
        detailsSection.classList.add('visible'); // Hacemos visible toda la sección
        infoBoxes.forEach((box, index) => {
            box.style.animationDelay = `${index * 0.1}s`; 
            box.classList.add('scale-up-center');
        });
    };

    const hideInfo = () => {
        detailsSection.classList.remove('visible'); // Ocultamos toda la sección
        infoBoxes.forEach(box => {
            box.classList.remove('scale-up-center');
            box.style.animationDelay = '';
        });
    };

    avatarInteractiveArea.addEventListener('mouseenter', showInfo);
    avatarInteractiveArea.addEventListener('mouseleave', hideInfo);
    }
});