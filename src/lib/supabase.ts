import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://humzhgsggypwlqttzhcn.supabase.co';
const supabaseAnonKey = 'sb_publishable_h3DcApIJP3D20_V7MfdNng_AZ_jw6KH';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  fee: string;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};
