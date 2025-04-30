import express from "express";
import publicRoute from "./routes/public.route.js";
import cors from "cors";
import { CORS_ORIGIN } from "./config/env.js";

const app = express();

app.use(express.json())

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
}));

app.use("/api", publicRoute); 

app.listen(3333, () => {
    console.log("Server running on port 3333: http://localhost:3333");
})