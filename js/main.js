const databaseURL = 'https://landing-5bec8-default-rtdb.firebaseio.com/data.json'

let sendData = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' })

    fetch(databaseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json();
        })
        .then(result => {
            alert('Agradeciendo tu preferencia, nos manetenemos actualizados y enfocados en atenderte como mereces');
            form.reset()
        })
        .catch(error => {
            alert("Hemos experimentado un error. ¡Vuelve pronto!");
        });
}

let ready = () => {
    console.log('DOM está listo')
}

let loaded = (eventLoaded) => {
    let myform = document.getElementById('form');
    myform.addEventListener("submit", (eventSubmit) => {
        eventSubmit.preventDefault();
        const emailElement = document.querySelector('.form-control-lg');
        const emailText = emailElement.value;
        if (emailText.length === 0) {
            emailElement.focus()
            
            emailElement.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(50px)" },
                    { transform: "translateX(-50px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 150,
                    easing: "linear",
                }
            )
            return;
        }
        sendData();
    })
}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)