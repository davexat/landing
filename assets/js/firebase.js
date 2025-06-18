import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, push, get, onValue } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Importa las funciones necesarias desde el CDN de Firebase v11.9.1

// Configuración de Firebase usando variables de entorno de Vite
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

/*
// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Obtiene la referencia a la base de datos en tiempo real
const database = getDatabase(app);

export function saveVote(productID) {
    const votesRef = ref(database, 'votes');
    const newVoteRef = push(votesRef);
    const voteData = {
        productID: productID,
        date: new Date().toISOString()
    };
    return set(newVoteRef, voteData)
        .then(() => ({
            success: true,
            message: 'Voto guardado exitosamente.'
        }))
        .catch((error) => ({
            success: false,
            message: 'Error al guardar el voto: ' + error.message
        }));
}

// Nueva función para obtener los votos
export function getVotes() {
    const votesRef = ref(database, 'votes');
    return get(votesRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                return {
                    success: true,
                    data: snapshot.val()
                };
            } else {
                return {
                    success: true,
                    data: null
                };
            }
        })
        .catch((error) => ({
            success: false,
            message: 'Error al obtener los votos: ' + error.message
        }));
}
*/

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Guardar comentario en Firebase
async function saveComment(name, message) {
  const commentsRef = ref(database, 'comments');
  const newCommentRef = push(commentsRef);
  const commentData = {
    name,
    message,
    date: new Date().toISOString()
  };
  await set(newCommentRef, commentData);
}

// Mostrar comentarios en la sección
function renderComments(commentsObj) {
  const commentsSection = document.getElementById('comments_section');
  const noComments = document.getElementById('no_comments');
  commentsSection.innerHTML = '';
  if (!commentsObj) {
    noComments.style.display = '';
    commentsSection.appendChild(noComments);
    return;
  }
  const comments = Object.values(commentsObj).sort((a, b) => new Date(b.date) - new Date(a.date));
  comments.forEach(comment => {
    const div = document.createElement('div');
    div.className = "mb-4";
    div.innerHTML = `
      <p class="font-semibold text-blue-700">${comment.name}</p>
      <p class="text-gray-700">${comment.message}</p>
      <hr class="my-2">
    `;
    commentsSection.appendChild(div);
  });
}

// Leer comentarios en tiempo real
function listenForComments() {
  const commentsRef = ref(database, 'comments');
  onValue(commentsRef, (snapshot) => {
    renderComments(snapshot.exists() ? snapshot.val() : null);
  });
}

// Manejar envío del formulario
document.getElementById('form_comments').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('input_name').value.trim();
  const message = document.getElementById('input_message').value.trim();
  if (name && message) {
    await saveComment(name, message);
    this.reset();
  }
});

// Iniciar escucha de comentarios
listenForComments();
