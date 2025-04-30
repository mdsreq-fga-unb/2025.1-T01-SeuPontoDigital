import express from "express";
import publicRoute from "./routes/public.route.js";
import cors from "cors";
import { CORS_ORIGIN, PORT } from "./config/env.js";

const app = express();

app.use(express.json())

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
}));

app.use("/api", publicRoute); 

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}: http://localhost:${PORT}`);
})