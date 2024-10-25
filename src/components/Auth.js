import { useState } from 'react';
import Login from './Login';
import Register from './Register'; 

export default function Auth({ isRegistering, setIsRegistering, setSession }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Verificar que el email y la contraseña no estén vacíos
    if (!email || !password) {
      console.error('El correo y la contraseña son requeridos');
      setErrorMessage('El correo y la contraseña son requeridos');
      return;
    }

    // Realiza la consulta a la API de inicio de sesión
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Manejo de la respuesta
    if (!response.ok) {
      const errorData = await response.json();
      setErrorMessage(errorData.error || 'Error al iniciar sesión');
      return;
    }

    const data = await response.json();
    console.log('Inicio de sesión exitoso:', data);
    setSession(data); // Guarda la sesión en el estado padre
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Verificar que el email y la contraseña no estén vacíos
    if (!email || !password) {
      console.error('El correo y la contraseña son requeridos');
      setErrorMessage('El correo y la contraseña son requeridos');
      return;
    }

    // Realiza la consulta a la API de registro
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Manejo de la respuesta
    if (!response.ok) {
      const errorData = await response.json();
      setErrorMessage(errorData.error || 'Error al registrarse');
      return;
    }

    const data = await response.json();
    console.log('Registro exitoso:', data);
    setSession(data); // Guarda la sesión en el estado padre
  };

  return (
    <div>
      {isRegistering ? (
        <>
          <h1>Registrarse</h1>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Registrarse</button>
          </form>
          <p onClick={() => setIsRegistering(false)}>
            Ya tienes una cuenta? Inicia sesión
          </p>
        </>
      ) : (
        <>
          <h1>Iniciar sesión</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Iniciar sesión</button>
          </form>
          <p onClick={() => setIsRegistering(true)}>
            No tienes una cuenta? Regístrate
          </p>
        </>
      )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
