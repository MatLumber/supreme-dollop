// components/Login.js
import { useState } from 'react';

export default function Login({ setSession }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Verificar que el email y la contraseña no estén vacíos
    if (!email || !password) {
      setErrorMessage('Correo y contraseña son requeridos');
      return;
    }

    // Realiza la solicitud POST al API de login
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.error);
      return;
    }

    // Si la autenticación es exitosa, actualiza la sesión
    setSession(data.userId);
    // Aquí puedes agregar más lógica si es necesario
  };

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
