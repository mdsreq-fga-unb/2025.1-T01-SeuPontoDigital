import express from "express";
import cors from "cors";
import publicRoute from "./routes/public.route.js";
import privateRoute from "./routes/private.route.js";
import { CORS_ORIGIN, PORT } from "./settings/env.js";


const app = express();

app.use(express.json());

// Configuração de CORS
const corsOrigin = [CORS_ORIGIN]

app.use(cors({
    origin: corsOrigin,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Rotas da API
app.use("/api", publicRoute);
app.use("/api", privateRoute);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
