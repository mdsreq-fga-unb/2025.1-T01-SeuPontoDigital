import express from "express";
import cors from "cors";
import publicRoute from "./routes/public.route.js";
import privateRoute from "./routes/private.route.js";
import { CORS_ORIGIN, PORT, CORS_ORIGIN_MOBILE } from "./config/env.js";
import logger, { createRequestLogger } from "./config/logger.js";

const app = express();

// Request logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    
    // Attach logger to request object
    req.logger = createRequestLogger(req);
    
    // Log request
    req.logger.info(`[${req.method}][${req.originalUrl || req.url}] IP: ${req.ip}`);

    // Override res.json to log response
    const originalJson = res.json;
    res.json = function(body) {
        const responseTime = Date.now() - start;
        if(res.statusCode === 500) {
            req.logger.error(`[${req.method}][${req.originalUrl || req.url}] Status: ${res.statusCode} Time: ${responseTime}ms ${JSON.stringify(body)}`);
        }
        else {
            req.logger.info(`[${req.method}][${req.originalUrl || req.url}] Status: ${res.statusCode} Time: ${responseTime}ms`);

        }
        return originalJson.call(this, body);
    };

    next();
});

app.use(express.json());

app.use(cors({
    origin: [CORS_ORIGIN, CORS_ORIGIN_MOBILE],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
}));

app.use("/api", publicRoute);
app.use("/api", privateRoute);

app.listen(PORT, () => {
    logger.info(`[SERVER] Running on port ${PORT}`);
});