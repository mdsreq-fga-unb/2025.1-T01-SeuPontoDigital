import express from "express";
import {registerAdminController, loginAdminController} from "../controllers/adminController.js"

const adminRouter = express.Router();

adminRouter.post("/register", registerAdminController);

adminRouter.post("/login", loginAdminController);

export default adminRouter;