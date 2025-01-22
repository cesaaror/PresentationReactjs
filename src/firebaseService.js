// firebaseService.js

import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot, 
  query, orderBy, getDocs, setDoc, serverTimestamp 
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicializa Firestore
const auth = getAuth(app); // Inicializa Firebase Authentication

export { db, auth };

// Función para agregar un mensaje
export const sendMessage = async (messageData) => {
  try {
    await addDoc(collection(db, "messages"), {
      ...messageData,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error al enviar el mensaje: ", error);
    throw new Error("No se pudo enviar el mensaje.");
  }
};

// Función para suscribirse a los mensajes en tiempo real
export const subscribeToMessages = (setMessages) => {
  const messagesQuery = query(collection(db, "messages"), orderBy("createdAt", "asc"));
  return onSnapshot(messagesQuery, (snapshot) => {
    const messagesList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(messagesList);
  });
};

// Función para agregar un comentario
export const handleCommentSubmit = async (comment, user) => {
  try {
    await addDoc(collection(db, "comments"), {
      text: comment.trim(),
      uid: user.uid,
      displayName: user.displayName || "Usuario Anónimo",
      timestamp: serverTimestamp(),
    });
  } catch (e) {
    console.error("Error al agregar el comentario:", e);
    throw new Error("No se pudo agregar el comentario");
  }
};

// Función para obtener comentarios
export const fetchComments = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "comments"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error al obtener los comentarios:", e);
    return [];
  }
};

// Función para eliminar un comentario
export const handleDeleteComment = async (id) => {
  try {
    await deleteDoc(doc(db, "comments", id));
  } catch (e) {
    console.error("Error al eliminar el comentario:", e);
    throw new Error("No se pudo eliminar el comentario");
  }
};

// Función para suscribirse a los comentarios en tiempo real
export const subscribeToComments = (setComments) => {
  const commentsQuery = query(collection(db, "comments"), orderBy("timestamp", "desc"));
  return onSnapshot(commentsQuery, (snapshot) => {
    const commentsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setComments(commentsList);
  });
};

// Función para notificar que un usuario está escribiendo
export const notifyTyping = async (typingData) => {
  try {
    const typingRef = doc(db, "typing", typingData.uid);
    await setDoc(typingRef, {
      displayName: typingData.displayName,
      uid: typingData.uid,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error al notificar que el usuario está escribiendo:", error);
  }
};

// Función para suscribirse a los usuarios que están escribiendo
export const subscribeToTyping = (setTypingUser) => {
  const typingQuery = collection(db, "typing");
  return onSnapshot(typingQuery, (snapshot) => {
    const typingDocs = snapshot.docs.map((doc) => doc.data());
    const typingUsers = typingDocs.map((doc) => doc.displayName).join(", ");
    setTypingUser(typingUsers || null);
  });
};

// Función para eliminar la notificación de escritura de un usuario
export const removeTypingNotification = async (uid) => {
  try {
    const typingRef = doc(db, "typing", uid);
    await deleteDoc(typingRef);
  } catch (error) {
    console.error("Error al eliminar la notificación de escritura:", error);
  }
};

// Función para suscribirse a la autenticación de Firebase
export const subscribeToAuth = (setUser) => {
  return onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
};
