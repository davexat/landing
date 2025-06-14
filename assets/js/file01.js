'use strict';

import { fetchFakerData } from './functions.js';
import { saveVote, getVotes } from './firebase.js';

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

// Nueva función para mostrar los votos
async function displayVotes() {
    const resultsEl = document.getElementById('results');
    if (!resultsEl) return;

    const response = await getVotes();
    if (!response.success || !response.data) {
        resultsEl.innerHTML = '<p>No hay votos registrados.</p>';
        return;
    }

    // Contar votos por producto
    const voteCounts = {};
    Object.values(response.data).forEach(vote => {
        const product = vote.productID;
        voteCounts[product] = (voteCounts[product] || 0) + 1;
    });

    // Crear tabla
    let table = '<table><thead><tr><th>Producto</th><th>Total de votos</th></tr></thead><tbody>';
    for (const [product, count] of Object.entries(voteCounts)) {
        table += `<tr><td>${product}</td><td>${count}</td></tr>`;
    }
    table += '</tbody></table>';

    resultsEl.innerHTML = table;
}

function enableForm() {
    const form = document.getElementById('form_voting');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const input = document.getElementById('select_product');
        if (!input) return;
        const value = input.value;
        saveVote(value).then(() => {
            displayVotes();
        });
        form.reset();
    });
}

// Función de autoejecución
(() => {
    loadData();
    enableForm();
    displayVotes();
})();