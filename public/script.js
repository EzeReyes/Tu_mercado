const productos = document.querySelector(".productos");

// Menu Hamburguesa

const button = document.querySelector('.buttonMenu');
const nav = document.querySelector('.nav');
const imgCruz = document.querySelector('.imgCruz');


const opacidad = () => {
    if (nav.classList.contains('activo')) {
        button.style.display = "none";
        imgCruz.style.display = "block";
    } else {
        button.style.display = "block";
        imgCruz.style.display = "none";
    }
};

button.addEventListener('click', () => {
    nav.classList.toggle('activo')
    opacidad()
})

imgCruz.addEventListener('click', () => {
    nav.classList.toggle('activo')
    opacidad()
})
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('miFormulario');
    if (form) {
        form.addEventListener('submit', function(event) {
            const busquedaInput = document.getElementById('busqueda');
            const busqueda = busquedaInput.value.trim();
            const errorElement = document.getElementById('busqueda-error');

            // Limpiar cualquier mensaje de error previo
            if (errorElement) {
                errorElement.textContent = '';
            }

            if (busqueda === '') {
                // Mostrar mensaje de error y prevenir el envío del formulario
                if (errorElement) {
                    errorElement.textContent = 'Por favor, ingresa un término de búsqueda';
                    errorElement.style.color = 'red';
                } else {
                    alert('Por favor, ingresa un término de búsqueda');
                }
                event.preventDefault(); // Evita que se envíe el formulario
            }
        });

        // Agregar evento input para limpiar el mensaje de error al escribir
        const busquedaInput = document.getElementById('busqueda');
        if (busquedaInput) {
            busquedaInput.addEventListener('input', () => {
                const errorElement = document.getElementById('busqueda-error');
                if (errorElement) {
                    errorElement.textContent = '';
                }
            });
        }
    }
});

const togglePassword = (p) => {
    const Password = document.getElementById(p);
    const togglePassword = document.querySelector('.toggle-password');

    if (Password.type === 'password') { 
        Password.type = 'text';
        togglePassword.textContent = '👁️‍🗨️'} else {
        Password.type = 'password';
        togglePassword.textContent = '👁️'}
}



// --------------------------------------------------
// ADMINISTRADOR
document.addEventListener('DOMContentLoaded', () => {
    const inputName = document.getElementById('Nombre');
    const inputDescription = document.getElementById('Descripcion');
    const inputPrice = document.getElementById('Precio');
    const inputStock = document.getElementById('Stock');

    const formEdit = document.querySelector('.form-edit');

    const formInfo = document.createElement('div');
    formEdit.appendChild(formInfo);

    const updateFormInfo = () => {
        formInfo.innerHTML = `
            <h3>Nombre: ${inputName.value}</h3>
            <h3>Descripción: ${inputDescription.value}</h3>
            <h3>Precio: ${inputPrice.value}</h3>
            <h3>Stock: ${inputStock.value}</h3>
        `;
    };

    inputName.addEventListener('input', updateFormInfo);
    inputDescription.addEventListener('input', updateFormInfo);
    inputPrice.addEventListener('input', updateFormInfo);
    inputStock.addEventListener('input', updateFormInfo);

    // Inicializa la información del formulario con los valores actuales
    updateFormInfo();
});


// VISTA EDITAR USUARIO
const passEdit = document.getElementById('pass-edit');
const btnNoDisabled = document.getElementById('btn-no-disabled')
 
const noDisabled = () => {
    passEdit.disabled = false;
    passEdit.value = ''
}

btnNoDisabled.addEventListener('click', noDisabled);

