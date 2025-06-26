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
    
    // Log request with more details
    req.logger.info(`Incoming request - ${req.method} ${req.originalUrl || req.url} from ${req.ip}`, req.body);

    // Override res.json to log response
    const originalJson = res.json;
    res.json = function(body) {
        const responseTime = Date.now() - start;
        const logData = {
            method: req.method,
            url: req.originalUrl || req.url,
            status: res.statusCode,
            responseTime: `${responseTime}ms`
        };

        if(res.statusCode >= 400) {
            req.logger.error(`Request failed`, { ...logData, body });
        } else {
            req.logger.info(`Request completed`, logData);
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

// Catch-all middleware for unmatched routes
app.use((req, res) => {
    req.logger.warn(`Route not found - ${req.method} ${req.originalUrl || req.url}`);
    res.status(404).json({ 
        message: "Route not found",
        requested_url: req.originalUrl || req.url,
        method: req.method
    });
});

app.listen(PORT, () => {
    logger.info(`Server started`, { port: PORT });
});