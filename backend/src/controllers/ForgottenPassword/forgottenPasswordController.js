import getOneEmployeeFromCPF from "../../models/ContractEmployee/getOneEmployeeFromCPF.js";
import getOneEmployerFromCPF from "../../models/Employers/getOneEmployerFromCPF.js";
import sendSMS from "../../middlewares/sendSMS.js";

const forgottenPasswordController = async (req, res) => {
    const { cpf, phone } = req.body;

    console.log('--- [POST /first-access] ---');
    console.log('Recebido:', { cpf, phone });

    if (!cpf || !phone) {
        return res.status(400).send({ message: "cpf and phone are required" });
    }

    try {
        let user = await getOneEmployeeFromCPF(cpf);
        let userType = "employee";

        if (!user) {
            user = await getOneEmployerFromCPF(cpf);
            userType = "employer";
        }

        if (!user) {
            return res.status(404).send({ message: "user not found" });
        }

        if (user.cpf !== cpf || user.phone !== phone) {
            return res.status(400).send({ message: "incorrect data (cpf or phone)" });
        }

        
        
        await sendSMS(phone);

        return res.status(200).send({ message: "code sent" });

    } catch (err) {
        console.error("Erro no forgottenPasswordController:", err);
        return res.status(500).send({
            message: "Erro interno ao processar solicitação de recuperação de senha. Tente novamente mais tarde."
        });
    }
}

export default forgottenPasswordController;