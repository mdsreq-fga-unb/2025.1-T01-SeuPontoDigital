import express from "express";
import loginAdmin from "../controllers/Admin/loginAdmin.js";
import firstAccessController from "../controllers/FirstAccess/firstAccessController.js";
import createPassword from "../controllers/FirstAccess/createPassword.js";
import forgottenPasswordController from "../controllers/ForgottenPassword/forgottenPasswordController.js";
import updatePassword from "../controllers/ForgottenPassword/updatePassword.js";
import loginApp from "../controllers/LoginApp/loginApp.js";
import validatePassword from '../middlewares/validateStrongPassword.js';

const publicRoute = express.Router();

/**
 * @swagger
 * /login-admin:
 *   post:
 *     summary: Login do administrador
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
publicRoute.post("/login-admin", loginAdmin);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login geral
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
publicRoute.post("/login", loginAdmin);

/**
 * @swagger
 * /login-app:
 *   post:
 *     summary: Login do aplicativo móvel
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
publicRoute.post("/login-app", loginApp);

/**
 * @swagger
 * /first-access:
 *   post:
 *     summary: Primeiro acesso do usuário
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *               phone:
 *                 type: string
 *                 description: Telefone do usuário
 *               password:
 *                 type: string
 *                 description: Nova senha (deve ser forte)
 *                 minLength: 8
 *             required:
 *               - email
 *               - phone
 *               - password
 *     responses:
 *       200:
 *         description: Primeiro acesso realizado com sucesso
 *       400:
 *         description: Dados inválidos ou senha fraca
 *       500:
 *         description: Erro interno do servidor
 */
publicRoute.post("/first-access", validatePassword, firstAccessController);

/**
 * @swagger
 * /create-password:
 *   patch:
 *     summary: Criar nova senha
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de verificação
 *               password:
 *                 type: string
 *                 description: Nova senha
 *             required:
 *               - token
 *               - password
 *     responses:
 *       200:
 *         description: Senha criada com sucesso
 *       400:
 *         description: Token inválido ou senha fraca
 *       500:
 *         description: Erro interno do servidor
 */
publicRoute.patch("/create-password", createPassword);

/**
 * @swagger
 * /forgotten-password:
 *   post:
 *     summary: Solicitar recuperação de senha
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email do usuário
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Email de recuperação enviado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
publicRoute.post("/forgotten-password", forgottenPasswordController);

/**
 * @swagger
 * /update-password:
 *   patch:
 *     summary: Atualizar senha esquecida
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de recuperação
 *               password:
 *                 type: string
 *                 description: Nova senha
 *             required:
 *               - token
 *               - password
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Token inválido ou senha fraca
 *       500:
 *         description: Erro interno do servidor
 */
publicRoute.patch("/update-password", updatePassword);


export default publicRoute;
