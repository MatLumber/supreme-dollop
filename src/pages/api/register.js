// pages/api/register.js
import { supabase } from '../../lib/supabaseClient';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

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
    // Prueba la conexión a Supabase
    const { data: testData, error: testError } = await supabase.from('users').select('*').limit(1);
    if (testError) {
      console.error('Error de conexión a Supabase:', testError.message);
      return res.status(500).json({ error: 'Error al conectar a Supabase' });
    }
    console.log('Conexión exitosa a Supabase, datos:', testData);

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Genera un nuevo UUID para el id
    const userId = uuidv4();

    // Inserta el nuevo usuario en la base de datos
    const { data, error } = await supabase
      .from('users')
      .insert([{ id: userId, email, password: hashedPassword }])
      .select('id');

    if (error) {
      console.error('Error al registrar el usuario:', error.message);
      return res.status(400).json({ error: error.message });
    }

    // Si el registro es exitoso
    return res.status(201).json({ userId: data[0].id });
  } catch (error) {
    console.error('Error en el registro:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
