import express from "express";
import {PORT} from "./config/env.js";
import adminRouter from "./routes/admin.routes.js";

const app = express();

app.use(express.json());

app.use("/api/admin", adminRouter);

app.listen(PORT, () => {console.log("Server is running")});
