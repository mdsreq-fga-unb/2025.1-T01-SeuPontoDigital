// import verifyPassword from "../../middlewares/verifyPassword.js";
// import createToken from "../../middlewares/createToken.js";
import getOneUserFromCPF from "../../models/LoginApp/getOneUserFromCPF.js";

import supabase from "../../config/supabase.js";
import validateHashPasswordEqual from "../../middlewares/validateHashPasswordEqual.js";
import generateToken from "../../middlewares/generateToken.js";

const loginApp = async (req, res) => {
    try {
        const { cpf, password } = req.body;

        req.logger.info(`Attempting to login with CPF: ${cpf}`);

        const { data, error, userType } = await getOneUserFromCPF(cpf)

        if (error || !data) {
            req.logger.error(`Login failed - CPF not found: ${cpf}`);
            return res.status(404).send({ message: "CPF não encontrado." });
        }

        // const valid = await verifyPassword(password, data.password);
        // data.password existe agora
        const valid = await validateHashPasswordEqual(password, data.password);
        if (!valid) {
            req.logger.warn(`Login failed - Invalid password for CPF: ${cpf}`);
            return res.status(401).json({ message: data.password, password});
        }

        req.logger.info(`Login successful for CPF: ${cpf}, user type: ${userType}`);
        return res.status(200).json({
            message: "Login realizado com sucesso",
            // token: createToken(data),
            userType: userType,
            token: generateToken(data),
        });
    } catch (err) {
        req.logger.error(`Internal server error during login: ${err.message}`, { error: err });
        return res.status(500).send({ message: "Erro interno no servidor :)" });
    }
};

export default loginApp;