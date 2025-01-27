document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dataForm');
    if (form) {
        const submitBtn = document.getElementById('submitBtn');
        const inputs = form.querySelectorAll('input[required]');

        inputs.forEach(input => {
            input.value = '';
            input.style.borderColor = '';
        });
        submitBtn.disabled = true;

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                let allFilled = true;
                inputs.forEach(input => {
                    if (!input.value) {
                        allFilled = false;
                        input.style.borderColor = 'red';
                    } else {
                        input.style.borderColor = '';
                    }
                });
                submitBtn.disabled = !allFilled;
            });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            formData.forEach((value, key) => {
                localStorage.setItem(key, value);
            });
            window.location.href = 'resultados.html';
        });
    }

    const resultadoNombre = document.getElementById('resultadoNombre');
    if (resultadoNombre) {
        document.getElementById('resultadoNombre').textContent = localStorage.getItem('nombre');
        document.getElementById('resultadoEdad').textContent = localStorage.getItem('edad');
        document.getElementById('resultadoCiudad').textContent = localStorage.getItem('ciudad');
        document.getElementById('resultadoPasatiempo').textContent = localStorage.getItem('pasatiempo');

        const modal = document.getElementById("myModal");
        const volverBtn = document.getElementById("volverBtn");
        const closeBtn = document.getElementsByClassName("close")[0];
        const confirmBtn = document.getElementById("confirmBtn");
        const cancelBtn = document.getElementById("cancelBtn");

        modal.style.display = "none";

        volverBtn.onclick = function() {
            modal.style.display = "flex";
        }

        closeBtn.onclick = function() {
            modal.style.display = "none";
        }

        cancelBtn.onclick = function() {
            modal.style.display = "none";
        }

        confirmBtn.onclick = function() {
            localStorage.clear();
            window.location.href = 'index.html';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    fetch('ciudades.json')
        .then(response => response.json())
        .then(data => {
            const ciudadesList = document.getElementById('ciudadesList');
            for (const estado in data) {
                data[estado].forEach(ciudad => {
                    const option = document.createElement('option');
                    option.value = `${ciudad}, ${estado}`;
                    ciudadesList.appendChild(option);
                });
            }
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});