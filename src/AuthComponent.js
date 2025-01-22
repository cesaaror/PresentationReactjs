// AuthComponent.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const AuthComponent = ({ onUserLoggedIn }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleAuth = async () => {
    try {
      if (isRegistering) {
        if (password.length < 8 || /\s/.test(password)) {
          setError('La contraseña debe tener al menos 8 caracteres sin espacios.');
          return;
        }
        // Registro de usuario
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        onUserLoggedIn({ displayName, email });
      } else {
        // Inicio de sesión
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        onUserLoggedIn(userCredential.user);
      }
    } catch (error) {
      setError('Error en la autenticación: ' + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      onUserLoggedIn(user); // Llama a la función para actualizar el estado del usuario en el componente padre
    } catch (error) {
      setError('Error al iniciar sesión con Google: ' + error.message);
    }
  };

  return (
    <div>
      <h2>{isRegistering ? 'Registro' : 'Iniciar Sesión'}</h2>
      {isRegistering && (
        <input
          type="text"
          placeholder="Nombre"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
      )}
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={8}
        required
      />
      <button onClick={handleAuth}>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</button>
      
      {/* Botón para iniciar sesión con Google */}
      <button onClick={handleGoogleLogin}>Iniciar Sesión con Google</button>

      <p onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿Nuevo usuario? Regístrate'}
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AuthComponent;


