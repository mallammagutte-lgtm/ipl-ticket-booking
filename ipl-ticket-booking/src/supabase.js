
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ctkalptwmkjazzgmzrdj.supabase.co";

const supabaseKey = "sb_publishable_J-UgJZuU-9AJ9MHqpZ7DDw_x_XyKCcl";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
