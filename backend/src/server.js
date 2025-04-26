import express from "express";
import {PORT, CORS_ORIGIN} from "./config/env.js";
import adminRouter from "./routes/admin.routes.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: CORS_ORIGIN, 
    credentials: true,
    methods: ["POST", "GET"],            
}))

app.use(express.json());

app.use("/api/admin", adminRouter);

app.listen(PORT, () => {console.log("Server is running")});
