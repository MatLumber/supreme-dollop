import { createClient } from '@supabase/supabase-js';

// Reemplaza estos valores con los tuyos
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Asegúrate de que este env variable esté configurado
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Asegúrate de que este env variable esté configurado

export const supabase = createClient(supabaseUrl, supabaseAnonKey);