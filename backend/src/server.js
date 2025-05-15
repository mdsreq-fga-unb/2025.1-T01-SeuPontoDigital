import express from "express";
import cors from "cors";
import publicRoute from "./routes/public.route.js";
import privateRoute from "./routes/private.route.js";
import { CORS_ORIGIN, PORT, CORS_ORIGIN_MOBILE } from "./config/env.js";

const app = express();

app.use(express.json());

app.use(cors({
    origin: [CORS_ORIGIN, CORS_ORIGIN_MOBILE],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
}));


app.use("/api", publicRoute);


app.use(privateRoute);

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});