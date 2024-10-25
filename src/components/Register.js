// components/Register.js
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import bcrypt from 'bcryptjs';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Verifica que el correo y la contraseña no estén vacíos
    if (!email || !password) {
      setErrorMessage('El correo y la contraseña son requeridos');
      return;
    }

    // Hashear la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserta el nuevo usuario en la tabla 'users'
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword }]);

    if (error) {
      console.error('Error al registrarse:', error.message);
      setErrorMessage('Error al registrarse: ' + error.message);
      return;
    }

    setSuccessMessage('Usuario registrado exitosamente');
    console.log('Usuario registrado:', data);
    
    // Reiniciar los campos después del registro exitoso
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>Registrarse</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Registrarse</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}
