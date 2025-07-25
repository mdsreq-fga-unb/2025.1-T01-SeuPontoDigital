import express from "express";
import authVerifyToken from "../middlewares/authVerifyToken.js";


const privateRoute = express.Router();

// Aplicar middleware de autenticação em todas as rotas privadas
privateRoute.use(authVerifyToken);




export default privateRoute;