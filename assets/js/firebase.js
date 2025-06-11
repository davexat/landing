import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, push, get } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

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

