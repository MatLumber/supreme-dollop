import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import bcrypt from 'bcryptjs';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // 1. Buscar el usuario en la tabla "user"
    const { data: user, error } = await supabase
      .from('user')
      .select('id, password') // Selecciona solo la contraseña y el id
      .eq('email', email)
      .single(); // single() asegura que solo obtengas un resultado

    if (error || !user) {
      setErrorMessage('Usuario no encontrado');
      return;
    }

    // 2. Comparar la contraseña proporcionada con la almacenada
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      setErrorMessage('Contraseña incorrecta');
      return;
    }

    // 3. Almacenar la sesión (puedes usar localStorage o un JWT, según prefieras)
    localStorage.setItem('userId', user.id);
    alert('Inicio de sesión exitoso');

    // Aquí podrías redirigir al usuario a la página de chat
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
