let ready = () => {
    console.log('DOM está listo')
}

let loaded = () => {
    let myform = document.getElementById('form');
    myform.addEventListener("submit", (eventSubmit) => {
        eventSubmit.preventDefault();
        const emailElement = document.querySelector('.form-control-lg');
        const emailText = emailElement.value;
        if  (emailText.length === 0) {
            emailElement.focus()
            /*
            emailElement.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(50px)" },
                    { transform: "translateX(-50px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 10000,
                    easing: "linear",
                }
            )*/
            emailElement.animate(
                [
                    { transform: "translateX(0) rotate(0deg) scale(1)" },
                    { transform: "translateX(50px) rotate(10deg) scale(1.2)" },
                    { transform: "translateX(-50px) rotate(-10deg) scale(0.8)" },
                    { transform: "translateX(0) rotate(0deg) scale(1)" }
                ],
                {
                    duration: 100,
                    easing: "linear",
                    iterations: Infinity // Repite la animación indefinidamente
                }
            );
        }
    })
}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded)