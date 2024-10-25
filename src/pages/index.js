import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ChatList from '../components/ChatList';
import Auth from '../components/Auth';

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Obtener la sesión de usuario de forma asíncrona
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    
    getSession();

    // Listener para cambios en la autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Chat con GPT</h1>
      {session ? (
        <div>
          <ChatList userId={session.user.id} />
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}
