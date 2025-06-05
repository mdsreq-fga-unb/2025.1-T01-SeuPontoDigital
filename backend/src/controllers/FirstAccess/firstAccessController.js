import getOneEmployeeFromCPF from "../../models/ContractEmployee/getOneEmployeeFromCPF.js";
import getOneEmployerFromCPF from "../../models/Employers/getOneEmployerFromCPF.js";
import sendSMS from "../../middlewares/sendSMS.js";

const firstAccessController = async (req, res) => {
    const { name, cpf, phone } = req.body;

    console.log('--- [POST /first-access] ---');
    console.log('Recebido:', { name, cpf, phone });

    if (!name || !cpf || !phone) {
        console.log('Faltando campos:', { name, cpf, phone });
        return res.status(400).send({ message: "name, cpf and phone are required" });
    }

    try {
        let user = await getOneEmployeeFromCPF(cpf);
        let userType = "employee";

        if (!user) {
            user = await getOneEmployerFromCPF(cpf);
            userType = "employer";
        }

        if (!user) {
            console.log('Usuário não encontrado para CPF:', cpf);
            return res.status(404).send({ message: "user not found" });
        }

        if (user.name !== name || user.phone !== phone) {
            console.log('Dados incorretos:');
            console.log('Esperado:', { name: user.name, phone: user.phone });
            console.log('Recebido:', { name, phone });
            return res.status(400).send({ message: "incorrect data" });
        }
        
        if (user.password) {
            console.log('Usuário já possui senha:', cpf);
            return res.status(401).send({ message: `${userType} already has an account` });
        }

        try {
            await sendSMS(phone);
            console.log('SMS enviado para:', phone);
        } catch (smsErr) {
            console.error('Erro ao enviar SMS:', smsErr);
            return res.status(500).send({ message: "Erro ao enviar SMS" });
        }

        return res.status(200).send({ message: "send code" });

    } catch (err) {
        console.error('Erro interno em /first-access:', err);
        return res.status(500).send({ message: "internal server error" });
    }
}

export default firstAccessController;