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
});