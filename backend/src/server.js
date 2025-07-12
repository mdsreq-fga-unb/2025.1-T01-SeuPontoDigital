import express from "express";
import cors from "cors";
import publicRoute from "./routes/public.route.js";
import privateRoute from "./routes/private.route.js";
import { CORS_ORIGIN, PORT, CORS_ORIGIN_MOBILE } from "./config/env.js";

const app = express();

app.use(express.json());

// Configuração de CORS com fallbacks para desenvolvimento
const corsOrigins = [
    CORS_ORIGIN || "http://localhost:5173",
    CORS_ORIGIN_MOBILE || "http://localhost:8081",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000"
].filter(Boolean); // Remove valores undefined/null

app.use(cors({
    origin: corsOrigins,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

app.use("/api", publicRoute);
app.use("/api", privateRoute);

// Catch-all middleware for unmatched routes
app.use((req, res) => {
    res.status(404).json({ 
        message: "Route not found",
        requested_url: req.originalUrl || req.url,
        method: req.method
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`CORS origins: ${corsOrigins.join(", ")}`);
});