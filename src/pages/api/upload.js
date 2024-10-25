import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { file } = req.body;

    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from('attachments')
      .upload(fileName, file);

    if (error) return res.status(500).json({ error: error.message });

    const fileUrl = supabase.storage
      .from('attachments')
      .getPublicUrl(fileName).publicURL;

    // Devolver la URL del archivo
    res.status(200).json({ fileUrl });
  }
}
