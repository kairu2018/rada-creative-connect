
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://lsrlagcaavlemuqpgrbi.supabase.co";

// Replace this placeholder with your Supabase publishable key.
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_2hNV4BUX3SV7xXzY56g12w_gDGyCJ3P";

if (SUPABASE_PUBLISHABLE_KEY === "PASTE_YOUR_PUBLISHABLE_KEY_HERE") {
  console.error("RADA: Add your Supabase publishable key.");
} else {
  window.radaSupabase = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

  console.log("RADA Supabase client initialized.");
}
