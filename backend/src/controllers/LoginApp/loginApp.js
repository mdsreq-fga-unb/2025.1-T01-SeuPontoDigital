import getOneUserFromCPF from "../../models/LoginApp/getOneUserFromCPF.js";
import verifyPassword from "../../middlewares/verifyPassword.js";
import createToken from "../../middlewares/createToken.js";

const loginApp = async (req, res) => {
    const { cpf, password } = req.body;

    try {
        const user = await getOneUserFromCPF(cpf);

        if (!user) {
            return res.status(404).json({ message: "CPF não encontrado." });
        }

        const isPasswordValid = await verifyPassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Senha inválida." });
        }

        const userType = user.type;
        const token = createToken(user);

        return res.status(200).json({ token, userType });

    } catch (err) {
        console.error('Error in loginApp:', err);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

export default loginApp;