// pages/index.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ChatList from '../components/ChatList';
import Auth from '../components/Auth';
import TestComponent from '../components/TestComponent';

export default function Home() {
  const [session, setSession] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false); // Estado para saber si está registrándose

  useEffect(() => {
    // Escuchar cambios en la autenticación
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
      <TestComponent /> {/* Aquí se renderiza el componente de prueba */}
      {session ? (
        <div>
          <ChatList userId={session.user.id} />
        </div>
      ) : (
        <Auth setSession={setSession} isRegistering={isRegistering} setIsRegistering={setIsRegistering} />
      )}
    </div>
  );
}
