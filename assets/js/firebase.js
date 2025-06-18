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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

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

let allComments = [];
let currentPage = 0;
const COMMENTS_PER_PAGE = 3;

function renderCommentsPage() {
  const commentsSection = document.getElementById('comments_section');
  const noComments = document.getElementById('no_comments');
  const pagination = document.getElementById('pagination_controls');
  commentsSection.innerHTML = '';
  const start = currentPage * COMMENTS_PER_PAGE;
  const end = start + COMMENTS_PER_PAGE;
  const pageComments = allComments.slice(start, end);

  if (pageComments.length === 0) {
    if (noComments) {
      noComments.style.display = '';
      commentsSection.appendChild(noComments);
    }
    pagination.style.display = "none";
    return;
  }

  pageComments.forEach(comment => {
    const div = document.createElement('div');
    div.className = "bg-white overflow-hidden border border-gray-300 rounded-lg p-4 shadow flex flex-col";
    div.innerHTML = `
      <p class="font-semibold text-sky-500 mb-1">${comment.name}</p>
      <p class="text-gray-700 mb-2">${comment.message}</p>
      <span class="text-xs text-gray-400 self-end">${new Date(comment.date).toLocaleString()}</span>
    `;
    commentsSection.appendChild(div);
  });

  // Mostrar controles de paginación solo si hay más de 3 comentarios
  if (allComments.length > COMMENTS_PER_PAGE) {
    pagination.style.display = "flex";
    document.getElementById('prev_comments').disabled = currentPage === 0;
    document.getElementById('next_comments').disabled = end >= allComments.length;
  } else {
    pagination.style.display = "none";
  }
}

function listenForComments() {
  const commentsRef = ref(database, 'comments');
  onValue(commentsRef, (snapshot) => {
    if (!snapshot.exists()) {
      allComments = [];
    } else {
      allComments = Object.values(snapshot.val()).sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    currentPage = 0;
    renderCommentsPage();
  });
}

document.getElementById('form_comments').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('input_name').value.trim();
  const message = document.getElementById('input_message').value.trim();
  if (name && message) {
    await saveComment(name, message);
    this.reset();
  }
});

document.getElementById('prev_comments').addEventListener('click', function() {
  if (currentPage > 0) {
    currentPage--;
    renderCommentsPage();
  }
});

document.getElementById('next_comments').addEventListener('click', function() {
  if ((currentPage + 1) * COMMENTS_PER_PAGE < allComments.length) {
    currentPage++;
    renderCommentsPage();
  }
});

listenForComments();