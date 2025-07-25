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
export const CORS_ORIGIN_MOBILE = process.env.CORS_ORIGIN_MOBILE;
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
export const TWILIO_VERIFY_SERVICE_ID = process.env.TWILIO_VERIFY_SERVICE_ID;
export const API_KEY_MAPS = process.env.API_KEY_MAPS;