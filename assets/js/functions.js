'use strict';

let fetchFakerData =  (url) => {

    return fetch(url)
        .then(response => {

            // Verificar si la respuesta es exitosa (status 200-299)
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            return response.json();

        })
        .then(data => {

            // Respuesta exitosa
            return {
                success: true,
                body: data
            };

        })
        .catch(error => {

            return {
                success: false,
                error: `Error en la petición: ${error.message}`
            };

        });
}

export { fetchFakerData }

const loadData = async () => {

    const url = 'https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120';

    try {
        const result = await fetchFakerData(url);

        if (result.success) {
            console.log('Datos obtenidos con éxito:', result.body);
        } else {
            console.error('Error al obtener los datos:', result.error);
        }

    } catch (error) {

        console.error('Ocurrió un error inesperado:', error);

    }

};

// Función de autoejecución
(() => {

    loadData();
})();