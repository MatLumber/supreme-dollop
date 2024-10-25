import { useState } from 'react';

export default function Auth() {
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
    // Aquí puedes redirigir al usuario o realizar otras acciones
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
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
