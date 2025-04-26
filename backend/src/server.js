import express from "express";
import {PORT} from "./config/env.js";
import adminRouter from "./routes/admin.routes.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,                
}))

app.use(express.json());

app.use("/api/admin", adminRouter);

app.listen(PORT, () => {console.log("Server is running")});
