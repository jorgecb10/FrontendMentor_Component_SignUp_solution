document.addEventListener('DOMContentLoaded', () => {
    console.log('documento listo');

    const inputs = document.querySelectorAll('input')
    const firstName = document.querySelector('#first-name')
    const lastName = document.querySelector('#last-name')
    const email = document.querySelector('#email')
    const password = document.querySelector('#password')
    const btnSubmit = document.querySelector('#submit')
    const formulario = document.querySelector('#formulario')
    comprobarFormulario()

    inputs.forEach(input => {
        input.setAttribute('data-placeholder', input.getAttribute('placeholder'))
        input.addEventListener('input', validar)
    })

    email.addEventListener('blur', validarEmailBlur);
    email.addEventListener('focus', limpiarErrorCorreo);

    formulario.addEventListener('submit', enviarEmail)

    function validar(e) {
        if(e.target.value.trim() === '') {
            e.target.setAttribute('placeholder', e.target.getAttribute('data-placeholder'))
            mostrarAlerta(`${e.target.placeholder} cannot be empty`, e.target)
            comprobarFormulario()
            return
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('Looks like this is not an email', e.target)
            comprobarFormulario()
            btnSubmit.disabled = true
            btnSubmit.classList.add('opacity-70');
            return
        }

        btnSubmit.disabled = false
        btnSubmit.classList.remove('opacity-70');
        limpiarAlerta(e.target)
        limpiarImagen(e.target)
        borderInput(e.target)
        comprobarFormulario()
    }

    function validarEmailBlur(e) {
        const valorEmail = e.target.value.trim();

        if(valorEmail !== '' && !validarEmail(valorEmail)) {
            e.target.value = 'email@example/com'
            mostrarAlerta('Looks like this is not an email', e.target);
            e.target.classList.add('text-red-pink')
            btnSubmit.disabled = true;
            btnSubmit.classList.add('opacity-70');
            return
        }

        e.target.classList.remove('border-red-pink', 'focus:border-red-pink')
        e.target.setAttribute('placeholder', e.target.getAttribute('data-placeholder'));
    }

    function limpiarErrorCorreo(e) {
        // Cuando el input recibe foco, limpiamos el error 
        limpiarAlerta(e.target);
        limpiarImagen(e.target);
        e.target.value = ''
        e.target.classList.remove('text-red-pink')
    }

    function enviarEmail(e) {
        e.preventDefault()
        
        btnSubmit.disabled = true
        btnSubmit.classList.add('opacity-70');
        const confirmacion = document.createElement('p')
        confirmacion.classList.add('enviado', 'bg-green-hsl', 'text-white', 'p-3', 'mt-3', 'mb-5', 'text-center', 'rounded-md')
        confirmacion.textContent = 'we have sent the proof to your email'
        formulario.appendChild(confirmacion)

        setTimeout(() => {
            resetFormulario()
            confirmacion.remove()
        }, 3000);
    }

    function resetFormulario() {
        inputs.forEach(input => {
            input.value = ''
            limpiarAlerta(input)
            limpiarImagen(input)
            borderInput(input) 
            input.setAttribute('placeholder', input.getAttribute('data-placeholder'))
        })
        
        formulario.reset();
        btnSubmit.disabled = false;
        btnSubmit.classList.remove('opacity-70');

        comprobarFormulario();
    }

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const resultado = regex.test(email)
        return resultado
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia)
        limpiarImagen(referencia)
        borderInput(referencia)

        const error = document.createElement('p')
        error.textContent = mensaje
        error.classList.add('error', 'text-red-pink', 'text-right', 'italic', 'mt-1')
        referencia.insertAdjacentElement('afterend', error)
        
        const imagenError = document.createElement('img')
        imagenError.src = '../src/images/icon-error.svg'
        imagenError.classList.add('error-icon', 'absolute', 'right-6', 'bottom-10')

        const contenedorInput = referencia.parentElement
        contenedorInput.style.position = 'relative'
        contenedorInput.appendChild(imagenError)

        referencia.classList.add('border-red-pink', 'focus:border-red-pink')
        referencia.removeAttribute('placeholder')
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.nextElementSibling
        
        if(alerta && alerta.classList.contains('error')) {
            alerta.remove()
        }
    }

    function limpiarImagen(referencia) {
        const imagenError = referencia.parentElement.querySelector('.error-icon')

        if(imagenError) {
            imagenError.remove()
        }
    }

    function borderInput(referencia) {
        if(referencia.classList.contains('border-red-pink')) {
            referencia.classList.remove('border-red-pink', 'focus:border-red-pink')
        }
    }

    function comprobarFormulario() {
        if(firstName.value === '' ||  lastName.value === '' || email.value === '' || password.value === '') {
            btnSubmit.classList.add('opacity-70');
            btnSubmit.disabled = true
            return
        }

        btnSubmit.classList.remove('opacity-70');
        btnSubmit.disabled = false
    }
})