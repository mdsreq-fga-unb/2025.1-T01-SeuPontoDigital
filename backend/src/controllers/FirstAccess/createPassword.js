import getOneEmployeeFromCPF from "../../models/Contracts/getOneEmployeeFromCPF.js";
import getOneEmployerFromCPF from "../../models/Employers/getOneEmployerFromCPF.js";
import generatePasswordHash from "../../middlewares/generatePasswordHash.js";
import validateCodeSMS from "../../middlewares/validateCodeSMS.js";
import supabase from "../../config/supabase.js";

const createPassword = async (req, res) => {
    const { cpf, password, confirmPassword, code } = req.body;

    if (!cpf || !password || !confirmPassword || !code) {
        return res.status(400).send({ message: "CPF, senha, confirmação de senha e código são obrigatórios." });
    }

    try {
        let user = await getOneEmployeeFromCPF(cpf);
        let userType = "Funcionário";
        let table = "employee_contracts";

        if (!user) {
            user = await getOneEmployerFromCPF(cpf);
            userType = "Empregador";
            table = "employers";
        }

        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado." });
        }

        if (user.password) {
            return res.status(401).send({ message: `${userType} já possui uma conta.` });
        }

        const isValidCode = await validateCodeSMS(user.phone, code);

        if (!isValidCode) {
            return res.status(400).send({ message: "Código inválido." });
        }

        if (password !== confirmPassword) {
            return res.status(401).send({ message: "As senhas devem ser iguais." });
        }

        const passwordHash = await generatePasswordHash(password);

        const { data, error } = await supabase
            .from(table)
            .update({ password: passwordHash })
            .eq("id", user.id)
            .select()
            .single();

        if (error) {
            return res.status(500).send({ message: "Erro ao atualizar a senha." });
        }

        return res.status(200).send({ message: "Senha criada com sucesso!" });
    } 
    catch (err){
        return res.status(500).send({ message: "Erro interno do servidor." });
    }
}

export default createPassword;