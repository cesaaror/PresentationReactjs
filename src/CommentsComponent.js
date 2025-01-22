// CommentsSection.js
import React, { useEffect, useState } from 'react';
import { handleCommentSubmit, handleDeleteComment, subscribeToComments } from './firebaseService'; // Asegúrate de importar desde firebaseService

const CommentsSection = ({ user }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const submitComment = async () => {
    if (!user) {
      alert("Por favor, inicia sesión para dejar un comentario.");
      return;
    }
    if (comment.trim() === '') {
      alert("El comentario no puede estar vacío.");
      return;
    }

    setIsLoading(true);
    try {
      await handleCommentSubmit(comment.trim(), user);
      setComment(''); // Limpiar el campo de comentario después de enviar
    } catch (error) {
      alert("Ocurrió un error al enviar tu comentario.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este comentario?")) {
      try {
        await handleDeleteComment(id);
      } catch (error) {
        alert("Ocurrió un error al eliminar el comentario.");
      }
    }
  };

  useEffect(() => {
    // Suscribirse a los comentarios en tiempo real
    const unsubscribe = subscribeToComments(setComments);
    return () => unsubscribe(); // Limpiar la suscripción al desmontar
  }, []);

  return (
    <div className="comments-section">
      <h3>Deja tu comentario</h3>
      {user ? (
        <>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe tu comentario..."
            disabled={isLoading}
          />
          <button onClick={submitComment} disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar Comentario'}
          </button>
        </>
      ) : (
        <p>Por favor, inicia sesión para dejar un comentario.</p>
      )}
      <div className="comments-list">
        {comments.length === 0 ? (
          <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
        ) : (
          comments.map(({ id, text, uid, displayName }) => (
            <div key={id} className="comment">
              <p><strong>{displayName}:</strong> {text}</p>
              {user && user.uid === uid && (
                <button onClick={() => deleteComment(id)}>Eliminar</button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;


