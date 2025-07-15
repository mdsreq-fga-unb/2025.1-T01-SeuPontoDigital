import getOneEmployeeFromCPF from "../../models/Contracts/getOneEmployeeFromCPF.js";
import getOneEmployerFromCPF from "../../models/Employers/getOneEmployerFromCPF.js";
import sendCodeSMS from "../../middlewares/sendCodeSMS.js";
import formatNumber from "../../middlewares/formarPhone.js";

const firstAccessController = async (req, res) => {
    let { name, cpf, phone } = req.body;
    
    if (!name || !cpf || !phone) {
        return res.status(400).send({ message: "Nome, CPF e Telefone são obrigatórios!" });
    }

    try {
        let user = await getOneEmployeeFromCPF(cpf);

        if (!user) {
            user = await getOneEmployerFromCPF(cpf);
        }

        if (!user) {
            return res.status(404).send({ message: "Esse CPF não está cadastrado!" });
        }

        if (user.name !== name) {
            return res.status(400).send({ message: "O nome vinculado a esse CPF está incorreto. Escreva o nome completo" });
        }

        if (user.phone !== phone) {
            console.log(phone)
            return res.status(400).send({ message: "O número de celular digitado não pertence a esse CPF!" });
        }
        
        if (user.password) {
            return res.status(401).send({ message: `Você já possui uma conta!` });
        }


        try {
            await sendCodeSMS(formatNumber(phone));
        } catch (smsErr) {
            return res.status(500).send({ message: "Erro ao enviar SMS" });
        }

        return res.status(200).send({ message: "Código enviado!" });

    } catch (err) {
        return res.status(500).send({ message: "Erro interno do servidor" });
    }
}

export default firstAccessController;