document.addEventListener('DOMContentLoaded', ()=> {

    const email = {
        email: '',
        cc: '',
        asunto: '',
        mensaje: '',
    }


    // selecciono el input de emal
    const emailInput = document.querySelector('#email');
    const ccInput = document.querySelector('.cc')
    const asuntoInput = document.querySelector('#asunto');
    const mensajeInput = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario')
    const enviarBtn = document.querySelector('#formulario button[type="submit"]')
    const resetBtn = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner')

    

    resetBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // reiniciar el objeto
        formReset()

    })

    emailInput.addEventListener('input', validar);


    ccInput.addEventListener('input', validar)

    asuntoInput.addEventListener('input', validar);

    mensajeInput.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail)

    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            formReset()

            // crear una alerta de exito
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white','p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove()
            }, 3000);
        }, 3000);

    }

    function validar(e) {
        if(e.target.value.trim() === '' && e.target.name !== 'cc') { // el meetodo trim elimina espacios en blanco
            mostrarAlerta(`El campo ${e.target.id} es obligatorio.`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return; // detiene la ejecucion aca si es que entra al if
        } 


        if(e.target.id === 'email' && !validarMail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'cc' && !validarMail(e.target.value) && e.target.value !== '') {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }





        

        limpiarAlerta(e.target.parentElement);

        // asignar los valores al objecto EMAIL

        email[e.target.name] = e.target.value.trim().toLowerCase();

        // comprobar el objeto EMAIL

        

        comprobarEmail()
    };


    function limpiarAlerta(referencia) {
        // comprueba si ya existe una alerta en el DOM
        const alerta = referencia.querySelector('.error')
        if(alerta) {
            alerta.remove();
        }
    };


    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);
        
        // Genera alerta en el html
        const error = document.createElement('P');
        error.classList.add('error', 'opacity-50') 
        error.textContent = mensaje;

        // Inyecta el html en div de referencia
        referencia.appendChild(error)
        };


    function validarMail(email, referencia) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email)
        return resultado; 
    }


    function comprobarEmail() {
        

        // saco el valor del input opcional de la lista
        inputValuesList = [...Object.values(email)]
        inputValuesList.splice(1,1)

         // evalua si hay algun valor vacio del array
        if(inputValuesList.includes('')) {
            enviarBtn.classList.add('opacity-50')
            enviarBtn.disabled = true; 
        } else {
            enviarBtn.classList.remove('opacity-50')
            enviarBtn.disabled = false;
        }; 

    }

    function formReset() {
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        comprobarEmail();
        formulario.reset()
    }
    

})


