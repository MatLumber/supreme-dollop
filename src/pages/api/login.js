// pages/api/login.js
import { supabase } from '../../lib/supabaseClient';
import bcrypt from 'bcryptjs'; // Asegúrate de importar bcrypt

export default async function handler(req, res) {
  // Verifica que el método de la solicitud sea POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { email, password } = req.body;

  // Verifica que el correo y la contraseña no estén vacíos
  if (!email || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
  }

  try {
    // Consulta a la base de datos
    const { data, error } = await supabase
      .from('users')
      .select('id, password')
      .eq('email', email)
      .single();

    // Manejo de errores si el usuario no se encuentra
    if (error || !data) {
      console.error('Error al buscar el usuario:', error);
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Compara la contraseña hasheada
    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      console.log('Contraseña incorrecta para el correo:', email);
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Si la autenticación es exitosa
    return res.status(200).json({ userId: data.id });
  } catch (error) {
    // Manejo de errores del servidor
    console.error('Error en el inicio de sesión:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
