import express from "express";
import cors from "cors";
import publicRoute from "./routes/public.route.js";
import privateRoute from "./routes/private.route.js";
import { CORS_ORIGIN, PORT } from "./config/env.js";

const app = express();

app.use(express.json());

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
}));

app.use("/api", publicRoute);

app.use("/api", privateRoute);

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});