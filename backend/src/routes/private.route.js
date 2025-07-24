import express from "express";
import authVerifyToken from "../middlewares/authVerifyToken.js";

// ========== IMPORTS DOS CONTROLLERS ==========

// Address Controllers
import postAddressController from "../controllers/Address/postAddressController.js";
import putAddressController from "../controllers/Address/putAddressController.js";

// Contract Controllers
import getContractsController from "../controllers/Contracts/getContractsController.js";
import getOneContractController from "../controllers/Contracts/getOneContractController.js";
import getFullContractDataController from "../controllers/Contracts/getFullContractDataController.js";
import getEmployeeAndContractsController from "../controllers/Contracts/getEmployeeAndContractsController.js";
import postContractController from "../controllers/Contracts/postContractController.js";
import postCompleteContractController from "../controllers/Contracts/postCompleteContractController.js";
import putContractController from "../controllers/Contracts/putContractController.js";
import deleteContractController from "../controllers/Contracts/deleteContractController.js";

// Employee Controllers
import getEmployeesController from "../controllers/Employees/getEmployeesController.js";
import getOneEmployeeController from "../controllers/Employees/getOneEmployeeController.js";
import postEmployeeController from "../controllers/Employees/postEmployeeController.js";
import putEmployeeController from "../controllers/Employees/putEmployeeController.js";
import deleteEmployeeController from "../controllers/Employees/deleteEmployeeController.js";

// Employer Controllers
import getEmployersController from "../controllers/Employers/getEmployersController.js";
import getOneEmployerController from "../controllers/Employers/getOneEmployerController.js";
import postEmployerController from "../controllers/Employers/postEmployerController.js";
import putEmployerController from "../controllers/Employers/putEmployerController.js";
import deleteEmployerController from "../controllers/Employers/deleteEmployerController.js";

// SignContract Controllers
import getAllSignContractController from "../controllers/SignContract/getAllSignContractController.js";
import getOneSignContractController from "../controllers/SignContract/getOneSignContractController.js";
import postSignContractController from "../controllers/SignContract/postSignContractController.js";

// Employ Controllers
import postEmployController from "../controllers/Employ/postEmployController.js";
import getAllEmployController from "../controllers/Employ/getAllEmployController.js";

// WorkAddress Controllers
import postWorkAddressController from "../controllers/WorkAddress/postWorkAddressController.js";

// WorkSchedule Controllers
import getAllWorkScheduleController from "../controllers/WorkSchedule/getAllWorkScheduleController.js";
import getOneWorkScheduleController from "../controllers/WorkSchedule/getOneWorkScheduleController.js";
import postWorkScheduleController from "../controllers/WorkSchedule/postWorkScheduleController.js";
import putOneWorkScheduleController from "../controllers/WorkSchedule/putOneWorkScheduleController.js";
import deleteOneWorkScheduleController from "../controllers/WorkSchedule/deleteOneWorkScheduleController.js";
import validateWorkSchedule from "../middlewares/validateWorkSchedule.js";

// WorkBreaks Controllers
import putBreakController from "../controllers/WorkBreaks/putBreakController.js";

// Worklog Controllers
import getTodayRecordsController from "../controllers/Worklog/getTodayRecordsController.js";
import getRecordsController from "../controllers/Worklog/getRecordsController.js";
import getEmployerRecordsController from "../controllers/Worklog/getEmployerRecordsController.js";
import getEmployeeTimesheetController from "../controllers/Worklog/getEmployeeTimesheetController.js";
import postWorklogController from "../controllers/Worklog/postWorklogController.js";
import putWorklogController from "../controllers/Worklog/putWorklogController.js";

// Alerts Controllers
import getAlertsController from "../controllers/Alerts/getAlertsController.js";
import { validateDateTwoYearsContract, validateDateTwoYearsEmployee, validateDateTwoYearsEmployer } from "../middlewares/validateDateTwoYears.js";
import validateUser from "../middlewares/validateUser.js";


const privateRoute = express.Router();


// Aplicar middleware de autenticação em todas as rotas privadas
privateRoute.use(authVerifyToken);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * security:
 *   - bearerAuth: []
 */

// ========== ADDRESS ROUTES ==========
/**
 * @swagger
 * /address:
 *   post:
 *     summary: Criar endereço
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 description: Logradouro
 *               number:
 *                 type: string
 *                 description: Número
 *               city:
 *                 type: string
 *                 description: Cidade
 *               state:
 *                 type: string
 *                 description: Estado
 *               zip_code:
 *                 type: string
 *                 description: CEP
 *             required:
 *               - street
 *               - city
 *               - state
 *               - zip_code
 *     responses:
 *       201:
 *         description: Endereço criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.post("/address", postAddressController);

/**
 * @swagger
 * /address/{id}:
 *   put:
 *     summary: Atualizar endereço
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do endereço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *               number:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zip_code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Endereço atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Endereço não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.put("/address/:id", putAddressController);

// ========== CONTRACT ROUTES ==========
/**
 * @swagger
 * /contracts:
 *   get:
 *     summary: Listar todos os contratos
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contratos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contract'
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/contracts", getContractsController);

/**
 * @swagger
 * /contract/{id}:
 *   get:
 *     summary: Obter contrato por ID
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do contrato
 *     responses:
 *       200:
 *         description: Dados do contrato
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contract'
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Contrato não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/contract/:id", getOneContractController);

/**
 * @swagger
 * /contract/{id}/full:
 *   get:
 *     summary: Obter dados completos do contrato
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do contrato
 *     responses:
 *       200:
 *         description: Dados completos do contrato
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Contract'
 *                 - type: object
 *                   properties:
 *                     employee:
 *                       $ref: '#/components/schemas/Employee'
 *                     employer:
 *                       $ref: '#/components/schemas/Employer'
 *                     work_schedule:
 *                       $ref: '#/components/schemas/WorkSchedule'
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Contrato não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/contract/:id/full", getFullContractDataController);

/**
 * @swagger
 * /employee-contracts:
 *   get:
 *     summary: Obter funcionário e seus contratos
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Funcionário e contratos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employee:
 *                   $ref: '#/components/schemas/Employee'
 *                 contracts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contract'
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/employee-contracts", getEmployeeAndContractsController);

/**
 * @swagger
 * /contract:
 *   post:
 *     summary: Criar novo contrato
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *                 description: ID do funcionário
 *               employer_id:
 *                 type: integer
 *                 description: ID do empregador
 *               start_date:
 *                 type: string
 *                 format: date
 *                 description: Data de início
 *               end_date:
 *                 type: string
 *                 format: date
 *                 description: Data de fim
 *               salary:
 *                 type: number
 *                 format: float
 *                 description: Salário
 *               status:
 *                 type: string
 *                 enum: [active, inactive, pending]
 *                 description: Status do contrato
 *             required:
 *               - employee_id
 *               - employer_id
 *               - start_date
 *               - salary
 *     responses:
 *       201:
 *         description: Contrato criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.post("/contract", postContractController);

/**
 * @swagger
 * /contract/complete:
 *   post:
 *     summary: Criar contrato completo
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contract:
 *                 $ref: '#/components/schemas/Contract'
 *               employee:
 *                 $ref: '#/components/schemas/Employee'
 *               employer:
 *                 $ref: '#/components/schemas/Employer'
 *               work_schedule:
 *                 $ref: '#/components/schemas/WorkSchedule'
 *             required:
 *               - contract
 *               - employee
 *               - employer
 *     responses:
 *       201:
 *         description: Contrato completo criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.post("/contract/complete", postCompleteContractController);

/**
 * @swagger
 * /contract/{id}:
 *   put:
 *     summary: Atualizar contrato
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do contrato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               salary:
 *                 type: number
 *                 format: float
 *               status:
 *                 type: string
 *                 enum: [active, inactive, pending]
 *               access_app:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Contrato atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Contrato não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.put("/contract/:id", putContractController);

/**
 * @swagger
 * /contract/{id}:
 *   delete:
 *     summary: Deletar contrato
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do contrato
 *     responses:
 *       200:
 *         description: Contrato deletado com sucesso
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Contrato não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.delete("/contract/:id", validateDateTwoYearsContract ,deleteContractController);

// ========== EMPLOYEE ROUTES ==========
/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Listar todos os funcionários
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de funcionários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/employees", getEmployeesController);

/**
 * @swagger
 * /employee/{id}:
 *   get:
 *     summary: Obter funcionário por ID
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Dados do funcionário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/employee/:id", getOneEmployeeController);

/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Criar novo funcionário
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome completo
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email
 *               phone:
 *                 type: string
 *                 description: Telefone
 *               cpf:
 *                 type: string
 *                 description: CPF
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - cpf
 *               - birth_date
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.post("/employee", validateUser, postEmployeeController);

/**
 * @swagger
 * /employee/{id}:
 *   put:
 *     summary: Atualizar funcionário
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do funcionário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               cpf:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.put("/employee/:id", validateUser, putEmployeeController);

/**
 * @swagger
 * /employee/{id}:
 *   delete:
 *     summary: Deletar funcionário
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Funcionário deletado com sucesso
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Funcionário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.delete("/employee/:id", validateDateTwoYearsEmployee,deleteEmployeeController);

// ========== EMPLOYER ROUTES ==========
/**
 * @swagger
 * /employers:
 *   get:
 *     summary: Listar todos os empregadores
 *     tags: [Employers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empregadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employer'
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/employers", getEmployersController);

/**
 * @swagger
 * /employer/{id}:
 *   get:
 *     summary: Obter empregador por ID
 *     tags: [Employers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do empregador
 *     responses:
 *       200:
 *         description: Dados do empregador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employer'
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Empregador não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/employer/:id", getOneEmployerController);

/**
 * @swagger
 * /employer:
 *   post:
 *     summary: Criar novo empregador
 *     tags: [Employers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome/Razão social
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email
 *               phone:
 *                 type: string
 *                 description: Telefone
 *               cnpj:
 *                 type: string
 *                 description: CNPJ
 *               address:
 *                 type: string
 *                 description: Endereço
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - cnpj
 *     responses:
 *       201:
 *         description: Empregador criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.post("/employer", validateUser, postEmployerController);

/**
 * @swagger
 * /employer/{id}:
 *   put:
 *     summary: Atualizar empregador
 *     tags: [Employers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do empregador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome/Razão social
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email
 *               phone:
 *                 type: string
 *                 description: Telefone
 *               cnpj:
 *                 type: string
 *                 description: CNPJ
 *               address:
 *                 type: string
 *                 description: Endereço
 *     responses:
 *       200:
 *         description: Empregador atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Empregador não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.put("/employer/:id", validateUser, putEmployerController);

/**
 * @swagger
 * /employer/{id}:
 *   delete:
 *     summary: Deletar empregador
 *     tags: [Employers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do empregador
 *     responses:
 *       200:
 *         description: Empregador deletado com sucesso
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Empregador não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.delete("/employer/:id", validateDateTwoYearsEmployer, deleteEmployerController);

// ========== SIGN CONTRACT ROUTES ==========
/**
 * @swagger
 * /sign-contract:
 *   get:
 *     summary: Listar todos os contratos assinados
 *     tags: [Sign Contract]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contratos assinados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do contrato assinado
 *                   contract_id:
 *                     type: integer
 *                     description: ID do contrato
 *                   signed_at:
 *                     type: string
 *                     format: date-time
 *                     description: Data e hora da assinatura
 *                   employee_signature:
 *                     type: string
 *                     description: Assinatura do funcionário
 *                   employer_signature:
 *                     type: string
 *                     description: Assinatura do empregador
 *                   status:
 *                     type: string
 *                     enum: [pending, signed, cancelled]
 *                     description: Status da assinatura
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/sign-contract", getAllSignContractController);

/**
 * @swagger
 * /sign-contract/{id}:
 *   get:
 *     summary: Obter contrato assinado por ID
 *     tags: [Sign Contract]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do contrato assinado
 *     responses:
 *       200:
 *         description: Dados do contrato assinado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do contrato assinado
 *                 contract_id:
 *                   type: integer
 *                   description: ID do contrato
 *                 signed_at:
 *                   type: string
 *                   format: date-time
 *                   description: Data e hora da assinatura
 *                 employee_signature:
 *                   type: string
 *                   description: Assinatura do funcionário
 *                 employer_signature:
 *                   type: string
 *                   description: Assinatura do empregador
 *                 status:
 *                   type: string
 *                   enum: [pending, signed, cancelled]
 *                   description: Status da assinatura
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Contrato assinado não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/sign-contract/:id", getOneSignContractController);

/**
 * @swagger
 * /sign-contract:
 *   post:
 *     summary: Criar nova assinatura de contrato
 *     tags: [Sign Contract]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contract_id:
 *                 type: integer
 *                 description: ID do contrato
 *               employee_signature:
 *                 type: string
 *                 description: Assinatura do funcionário (base64 ou texto)
 *               employer_signature:
 *                 type: string
 *                 description: Assinatura do empregador (base64 ou texto)
 *               signed_at:
 *                 type: string
 *                 format: date-time
 *                 description: Data e hora da assinatura
 *               status:
 *                 type: string
 *                 enum: [pending, signed, cancelled]
 *                 description: Status da assinatura
 *             required:
 *               - contract_id
 *               - status
 *     responses:
 *       201:
 *         description: Assinatura de contrato criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.post("/sign-contract", postSignContractController);

// ========== EMPLOY ROUTES ==========
/**
 * @swagger
 * /employ:
 *   post:
 *     summary: Criar novo emprego/vínculo
 *     tags: [Employ]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employee_id:
 *                 type: integer
 *                 description: ID do funcionário
 *               employer_id:
 *                 type: integer
 *                 description: ID do empregador
 *               position:
 *                 type: string
 *                 description: Cargo/posição
 *               department:
 *                 type: string
 *                 description: Departamento
 *               hire_date:
 *                 type: string
 *                 format: date
 *                 description: Data de contratação
 *               status:
 *                 type: string
 *                 enum: [active, inactive, terminated]
 *                 description: Status do emprego
 *             required:
 *               - employee_id
 *               - employer_id
 *               - position
 *               - hire_date
 *     responses:
 *       201:
 *         description: Emprego criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.post("/employ", postEmployController);

/**
 * @swagger
 * /employ:
 *   get:
 *     summary: Listar todos os empregos/vínculos
 *     tags: [Employ]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: employee_id
 *         schema:
 *           type: integer
 *         description: Filtrar por ID do funcionário
 *       - in: query
 *         name: employer_id
 *         schema:
 *           type: integer
 *         description: Filtrar por ID do empregador
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive, terminated]
 *         description: Filtrar por status
 *     responses:
 *       200:
 *         description: Lista de empregos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do emprego
 *                   employee_id:
 *                     type: integer
 *                     description: ID do funcionário
 *                   employer_id:
 *                     type: integer
 *                     description: ID do empregador
 *                   position:
 *                     type: string
 *                     description: Cargo/posição
 *                   department:
 *                     type: string
 *                     description: Departamento
 *                   hire_date:
 *                     type: string
 *                     format: date
 *                     description: Data de contratação
 *                   status:
 *                     type: string
 *                     enum: [active, inactive, terminated]
 *                     description: Status do emprego
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Data de criação
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/employ", getAllEmployController);

// ========== WORK ADDRESS ROUTES ==========
/**
 * @swagger
 * /work-address:
 *   post:
 *     summary: Criar endereço de trabalho
 *     tags: [Work Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contract_id:
 *                 type: integer
 *                 description: ID do contrato
 *               name:
 *                 type: string
 *                 description: Nome do local de trabalho
 *               street:
 *                 type: string
 *                 description: Logradouro
 *               number:
 *                 type: string
 *                 description: Número
 *               neighborhood:
 *                 type: string
 *                 description: Bairro
 *               city:
 *                 type: string
 *                 description: Cidade
 *               state:
 *                 type: string
 *                 description: Estado
 *               zip_code:
 *                 type: string
 *                 description: CEP
 *               latitude:
 *                 type: number
 *                 format: float
 *                 description: Latitude (coordenada GPS)
 *               longitude:
 *                 type: number
 *                 format: float
 *                 description: Longitude (coordenada GPS)
 *               radius:
 *                 type: number
 *                 format: float
 *                 description: Raio de tolerância em metros
 *               is_active:
 *                 type: boolean
 *                 description: Se o endereço está ativo
 *             required:
 *               - contract_id
 *               - name
 *               - street
 *               - city
 *               - state
 *               - zip_code
 *               - latitude
 *               - longitude
 *     responses:
 *       201:
 *         description: Endereço de trabalho criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.post("/work-address", postWorkAddressController);

// ========== WORK SCHEDULE ROUTES ==========
/**
 * @swagger
 * /workschedule:
 *   get:
 *     summary: Listar todos os cronogramas de trabalho
 *     tags: [Work Schedule]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cronogramas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WorkSchedule'
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/workschedule", getAllWorkScheduleController);

/**
 * @swagger
 * /workschedule/{id}:
 *   get:
 *     summary: Obter cronograma por ID do contrato
 *     tags: [Work Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do contrato
 *     responses:
 *       200:
 *         description: Cronograma de trabalho
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkSchedule'
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Cronograma não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/workschedule/:id", getOneWorkScheduleController);

/**
 * @swagger
 * /workschedule/{id}:
 *   post:
 *     summary: Criar cronograma de trabalho
 *     tags: [Work Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do contrato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkSchedule'
 *           example:
 *             segunda:
 *               start: "08:00"
 *               end: "18:00"
 *               break_start: "12:00"
 *               break_end: "13:00"
 *             terca:
 *               start: "08:00"
 *               end: "18:00"
 *               break_start: "12:00"
 *               break_end: "13:00"
 *             quarta:
 *               start: "08:00"
 *               end: "18:00"
 *               break_start: "12:00"
 *               break_end: "13:00"
 *             quinta:
 *               start: "08:00"
 *               end: "18:00"
 *               break_start: "12:00"
 *               break_end: "13:00"
 *             sexta:
 *               start: "08:00"
 *               end: "18:00"
 *               break_start: "12:00"
 *               break_end: "13:00"
 *             sabado: null
 *             domingo: null
 *     responses:
 *       201:
 *         description: Cronograma criado com sucesso
 *       400:
 *         description: Dados inválidos ou violação das regras trabalhistas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro detalhada
 *                 violations:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista de violações encontradas
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.post("/workschedule/:id", validateWorkSchedule, postWorkScheduleController);

/**
 * @swagger
 * /workschedule/{id}:
 *   put:
 *     summary: Atualizar cronograma de trabalho
 *     tags: [Work Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do contrato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkSchedule'
 *           example:
 *             segunda:
 *               start: "08:00"
 *               end: "18:00"
 *               break_start: "12:00"
 *               break_end: "13:00"
 *             terca:
 *               start: "08:00"
 *               end: "18:00"
 *               break_start: "12:00"
 *               break_end: "13:00"
 *             quarta: null
 *             quinta: null
 *             sexta: null
 *             sabado: null
 *             domingo: null
 *     responses:
 *       200:
 *         description: Cronograma atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou violação das regras trabalhistas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro detalhada
 *                 violations:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista de violações encontradas
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Cronograma não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.put("/workschedule/:id", validateWorkSchedule, putOneWorkScheduleController);

/**
 * @swagger
 * /workschedule/{id}:
 *   delete:
 *     summary: Deletar cronograma de trabalho
 *     tags: [Work Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do contrato
 *     responses:
 *       200:
 *         description: Cronograma deletado com sucesso
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Cronograma não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.delete("/workschedule/:id", deleteOneWorkScheduleController);

// ========== WORK BREAKS ROUTES ==========
/**
 * @swagger
 * /workbreak/{id}:
 *   put:
 *     summary: Atualizar intervalo de trabalho
 *     tags: [Work Breaks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do contrato
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               break_start:
 *                 type: string
 *                 format: time
 *                 description: Horário de início do intervalo (HH:MM)
 *               break_end:
 *                 type: string
 *                 format: time
 *                 description: Horário de fim do intervalo (HH:MM)
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Data do intervalo
 *               duration:
 *                 type: integer
 *                 description: Duração do intervalo em minutos
 *               type:
 *                 type: string
 *                 enum: [lunch, coffee, rest, other]
 *                 description: Tipo do intervalo
 *             required:
 *               - break_start
 *               - break_end
 *               - date
 *     responses:
 *       200:
 *         description: Intervalo atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou intervalo fora das regras
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Contrato não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.put("/workbreak/:id", putBreakController);

// ========== ALERTS ROUTES ==========
/**
 * @swagger
 * /alerts:
 *   get:
 *     summary: Obter alertas do sistema
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: contract_id
 *         schema:
 *           type: integer
 *         description: Filtrar por ID do contrato
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [late, absence, overtime, break_violation, schedule_conflict]
 *         description: Filtrar por tipo de alerta
 *       - in: query
 *         name: resolved
 *         schema:
 *           type: boolean
 *         description: Filtrar por alertas resolvidos ou não
 *       - in: query
 *         name: date_from
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial para filtro
 *       - in: query
 *         name: date_to
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final para filtro
 *     responses:
 *       200:
 *         description: Lista de alertas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alert'
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/alerts", getAlertsController);

// ========== WORKLOG ROUTES ==========
/**
 * @swagger
 * /worklogToday/{id}:
 *   get:
 *     summary: Obter registros de ponto do dia atual
 *     tags: [Worklog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do contrato
 *     responses:
 *       200:
 *         description: Registros de hoje
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Worklog'
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Registros não encontrados
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/worklogToday/:id", getTodayRecordsController);

/**
 * @swagger
 * /worklog:
 *   get:
 *     summary: Obter todos os registros de ponto
 *     tags: [Worklog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: contract_id
 *         schema:
 *           type: integer
 *         description: Filtrar por ID do contrato
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de início do filtro
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         description: Data de fim do filtro
 *     responses:
 *       200:
 *         description: Lista de registros de ponto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Worklog'
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/worklog", getRecordsController);

/**
 * @swagger
 * /worklogEmployer:
 *   get:
 *     summary: Obter registros de ponto do empregador
 *     tags: [Worklog]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Registros do empregador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Worklog'
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/worklogEmployer", getEmployerRecordsController);

/**
 * @swagger
 * /timesheet:
 *   get:
 *     summary: Obter folha de ponto do funcionário
 *     tags: [Worklog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Mês (1-12)
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Ano
 *     responses:
 *       200:
 *         description: Folha de ponto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employee:
 *                   $ref: '#/components/schemas/Employee'
 *                 records:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Worklog'
 *                 summary:
 *                   type: object
 *                   properties:
 *                     total_hours:
 *                       type: string
 *                       description: Total de horas trabalhadas
 *                     total_days:
 *                       type: integer
 *                       description: Total de dias trabalhados
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.get("/timesheet", getEmployeeTimesheetController);

/**
 * @swagger
 * /worklog:
 *   post:
 *     summary: Criar registro de ponto
 *     tags: [Worklog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contract_id:
 *                 type: integer
 *                 description: ID do contrato
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Data do registro
 *               clock_in:
 *                 type: string
 *                 format: time
 *                 description: Horário de entrada
 *               clock_out:
 *                 type: string
 *                 format: time
 *                 description: Horário de saída
 *               break_start:
 *                 type: string
 *                 format: time
 *                 description: Início do intervalo
 *               break_end:
 *                 type: string
 *                 format: time
 *                 description: Fim do intervalo
 *             required:
 *               - contract_id
 *               - date
 *               - clock_in
 *     responses:
 *       201:
 *         description: Registro criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.post("/worklog", postWorklogController);

/**
 * @swagger
 * /worklog:
 *   put:
 *     summary: Atualizar registro de ponto
 *     tags: [Worklog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID do registro
 *               clock_in:
 *                 type: string
 *                 format: time
 *                 description: Horário de entrada
 *               clock_out:
 *                 type: string
 *                 format: time
 *                 description: Horário de saída
 *               break_start:
 *                 type: string
 *                 format: time
 *                 description: Início do intervalo
 *               break_end:
 *                 type: string
 *                 format: time
 *                 description: Fim do intervalo
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Registro atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Registro não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
privateRoute.put("/worklog", putWorklogController);

export default privateRoute;