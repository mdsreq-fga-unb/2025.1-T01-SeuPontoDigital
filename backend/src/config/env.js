import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.resolve(__dirname, "../../.env")});

export const supabaseURL = process.env.SUPABASE_URL;
export const supabaseKEY = process.env.SUPABASE_KEY;
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;