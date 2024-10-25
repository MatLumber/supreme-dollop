import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const TestComponent = () => {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from('users').select('*').limit(1);
      if (error) {
        console.error('Error de conexión a Supabase:', error.message);
      } else {
        console.log('Conexión exitosa a Supabase, datos:', data);
      }
    };

    testConnection();
  }, []);

  return <div>Test Supabase Connection</div>;
};

export default TestComponent;
