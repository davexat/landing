import { saveVote, getVotes } from './firebase.js';

// Habilita el formulario de votación
function enableForm() {
  const form = document.getElementById('form_voting');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const select = document.getElementById('select_product');
    if (!select) return;

    const productID = select.value;
    if (!productID) return;

    // Llama a la función para guardar el voto
    const result = await saveVote(productID);

    // Opcional: mostrar mensaje en el div de resultados
    const resultsDiv = document.getElementById('results');
    if (resultsDiv) {
      resultsDiv.innerHTML = `<p class="text-center mt-4">${result.message}</p>`;
    }

    form.reset();
  });
}

// Función para mostrar los votos en una tabla
async function displayVotes() {
  const resultsDiv = document.getElementById('results');
  if (!resultsDiv) return;

  try {
    const votes = await getVotes();

    if (!votes) {
      resultsDiv.innerHTML = `<p class="text-gray-500 text-center mt-16">Aún no hay votos registrados.</p>`;
      return;
    }

    // Contar votos por producto
    const voteCounts = {};
    Object.values(votes).forEach(vote => {
      if (vote.productID) {
        voteCounts[vote.productID] = (voteCounts[vote.productID] || 0) + 1;
      }
    });

    // Crear tabla
    let tableHTML = `
      <table class="min-w-full text-center">
        <thead>
          <tr>
            <th class="px-4 py-2">Producto</th>
            <th class="px-4 py-2">Total de votos</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (const [product, count] of Object.entries(voteCounts)) {
      tableHTML += `
        <tr>
          <td class="border px-4 py-2">${product}</td>
          <td class="border px-4 py-2">${count}</td>
        </tr>
      `;
    }

    tableHTML += `
        </tbody>
      </table>
    `;

    resultsDiv.innerHTML = tableHTML;
  } catch (error) {
    resultsDiv.innerHTML = `<p class="text-red-500 text-center mt-4">Error al obtener los votos.</p>`;
    console.error(error);
  }
}

// Autoejecución
(function () {
  enableForm();
  displayVotes();
})();