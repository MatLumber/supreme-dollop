import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ChatList({ userId }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    async function fetchChats() {
      let { data: chats, error } = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', userId);

      if (error) console.error(error);
      else setChats(chats);
    }

    if (userId) fetchChats();
  }, [userId]);

  return (
    <div>
      <h2>Your Chats</h2>
      <ul>
        {chats.map(chat => (
          <li key={chat.id}>{chat.id}</li>
        ))}
      </ul>
    </div>
  );
}
