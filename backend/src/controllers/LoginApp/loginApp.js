import supabase from "../../config/supabase.js";
import verifyPassword from "../../middlewares/verifyPassword.js";
import createToken from "../../middlewares/createToken.js";
import getOneUserFromCPF from "../../models/LoginApp/getOneUserFromCPF.js";

const loginApp = async (req, res) => {
    try {
        const { cpf, password } = req.body;

        const { data, error, userType } = await getOneUserFromCPF(cpf)

        if (error || !data) {
            return res.status(404).send({ message: "CPF não encontrado" });
        }

        // data.password existe agora
        const valid = await verifyPassword(password, data.password);
        if (!valid) {
            return res.status(401).json({ message: data.password, password});
        }

        return res.status(200).json({
            message: "Login realizado com sucesso",
            token: createToken(data),
            userType: userType
        });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "Erro interno no servidor :)" });
    }
};
export default loginApp;