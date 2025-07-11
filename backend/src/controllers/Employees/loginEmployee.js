import supabase from "../../config/supabase.js";
import validateHashPasswordEqual from "../../middlewares/validateHashPasswordEqual.js";
import generateToken from "../../middlewares/generateToken.js";

const loginEmployee = async (req, res) => {
    try {
        const { cpf, password } = req.body;

        const { data, error } = await supabase
            .from("employees")
            .select("*")
            .eq("cpf", cpf)
            .single();

        if (error || !data) {
            return res.status(404).send({ message: "CPF não encontrado." });
        }

        const valid = await validateHashPasswordEqual(password, data.password);
        if (!valid) {
            return res.status(401).json({ message: "Senha inválida." });
        }

        return res.status(200).json({
            message: "Login realizado com sucesso",
            token: generateToken(data)
        });

    } catch (err) {
        console.error('Error in loginEmployee:', err);
        return res.status(500).send({ message: "Erro interno no servidor." });
    }
};

export default loginEmployee;