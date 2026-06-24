import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://izrweljjknkftpvgaxzj.supabase.co";

const supabaseKey = "sb_publishable_KlZqBq6yaE7hffEtuMaPaw_WYNNSAW5";

export const supabase = createClient(supabaseUrl, supabaseKey);