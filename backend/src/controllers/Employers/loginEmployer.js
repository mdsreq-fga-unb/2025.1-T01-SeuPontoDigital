import supabase from "../../config/supabase.js";
import verifyPassword from "../../middlewares/verifyPassword.js";
import createToken from "../../middlewares/createToken.js";

const loginEmployer = async (req, res) => {
    try {
        const { cpf, password } = req.body;

        const { data, error } = await supabase
            .from("employers")
            .select("id, name, password")
            .eq("cpf", cpf)
            .single();

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
        });
    } catch (err) {
        return res.status(500).send({ message: "Erro interno no servidor" });
    }
};
export default loginEmployer;