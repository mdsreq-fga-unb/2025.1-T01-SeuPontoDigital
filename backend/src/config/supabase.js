import {createClient} from "@supabase/supabase-js";
import { supabaseURL, supabaseKEY } from "./env.js";

const supabase = createClient(supabaseURL, supabaseKEY);

export default supabase;