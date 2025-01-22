// handleCommentSubmit.js
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';

const db = getFirestore();

// Función para agregar un comentario
export const handleCommentSubmit = async (commentData) => {
  try {
    await addDoc(collection(db, 'comments'), {
      uid: commentData.uid,
      displayName: commentData.displayName,
      text: commentData.text,
      createdAt: new Date(),
      review: commentData.review || null, // Si la reseña es opcional
    });
  } catch (error) {
    console.error("Error al agregar el comentario: ", error);
    throw new Error("No se pudo agregar el comentario.");
  }
};

// Función para obtener todos los comentarios
export const fetchComments = async (setComments) => {
  try {
    const commentsQuery = query(collection(db, 'comments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const commentsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsList);
    });
    return unsubscribe; // Retornar la función para desuscribirse
  } catch (error) {
    console.error("Error al obtener los comentarios: ", error);
    return [];
  }
};

// Función para eliminar un comentario
export const handleDeleteComment = async (commentId) => {
  try {
    await deleteDoc(doc(db, 'comments', commentId));
  } catch (error) {
    console.error("Error al eliminar el comentario: ", error);
    throw new Error("No se pudo eliminar el comentario.");
  }
};
