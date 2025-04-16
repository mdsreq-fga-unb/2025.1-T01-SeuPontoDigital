import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// descomente o código abaixo apenas se for testar a conexao com o db

// async function testConnection(){
//     try {
//         const { data, error } = await supabase.from("teste").select("*");
//         if (error) {
//             console.log("Erro:", error.message);
//         }
//         else {
//             console.log("Conexão funcionou:", data);
//         }
//     }
//     catch (err){
//         console.log("Erro:", err);
//     }
// }
// testConnection();

export default supabase;