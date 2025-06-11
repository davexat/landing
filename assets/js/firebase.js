import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js';
import { getDatabase, ref, set, push, get, child } from 'https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js';

// Configuración de Firebase usando variables de entorno de Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializar la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Obtener referencia a la base de datos en tiempo real
const database = getDatabase(app);

// Función para guardar un voto en la base de datos
export function saveVote(productID) {
  // Referencia a la colección 'votes'
  const votesRef = ref(database, 'votes');
  // Crear una nueva referencia para el voto de un usuario
  const newVoteRef = push(votesRef);
  // Datos a guardar
  const voteData = {
    productID: productID,
    date: new Date().toISOString()
  };
  // Guardar los datos y manejar el resultado con promesas
  return set(newVoteRef, voteData)
    .then(() => ({
      success: true,
      message: 'Voto guardado correctamente.'
    }))
    .catch((error) => ({
      success: false,
      message: 'Error al guardar el voto.',
      error
    }));
}

// Función para obtener los votos de la base de datos
export function getVotes() {
  const dbRef = ref(database);
  return get(child(dbRef, 'votes'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
    .catch((error) => {
      throw error;
    });
}