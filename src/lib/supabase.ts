import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate credentials exist and are not placeholders
if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'your-project-url' || 
    supabaseAnonKey === 'your-anon-key') {
  throw new Error(
    '❌ Supabase credentials not configured!\n\n' +
    'Please update your .env file with actual Supabase credentials:\n' +
    '1. Go to https://supabase.com/dashboard\n' +
    '2. Select your project\n' +
    '3. Go to Settings → API\n' +
    '4. Copy your Project URL and anon/public key\n' +
    '5. Update .env file with real values'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
