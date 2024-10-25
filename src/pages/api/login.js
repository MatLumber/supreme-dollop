// pages/api/login.js
import { supabase } from '../../lib/supabaseClient';
import bcrypt from 'bcryptjs';
import { corsHeaders } from '../../lib/cors';

export default async function handler(req, res) {
  // Manejo de CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).set(corsHeaders).send('ok');
  }

  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Verifica que el email y la contraseña no estén vacíos
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
    }

    // Consulta la tabla 'users'
    const { data, error } = await supabase
      .from('users')
      .select('id, password')
      .eq('email', email)
      .single();

    // Manejo de errores
    if (error) {
      console.error('Error al iniciar sesión:', error.message);
      return res.status(400).json({ error: error.message });
    }

    // Si el usuario fue encontrado
    if (data) {
      const isPasswordValid = await bcrypt.compare(password, data.password);
      if (isPasswordValid) {
        return res.status(200).json({ message: 'Inicio de sesión exitoso', userId: data.id });
      } else {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }
    } else {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } else {
    // Método no permitido
    return res.status(405).json({ error: 'Método no permitido' });
  }
}
