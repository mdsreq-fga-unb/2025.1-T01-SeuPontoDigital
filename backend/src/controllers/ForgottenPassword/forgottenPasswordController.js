import getOneEmployeeFromCPF from "../../models/ContractEmployee/getOneEmployeeFromCPF.js";
import getOneEmployerFromCPF from "../../models/Employers/getOneEmployerFromCPF.js";
import sendCodeSMS from "../../middlewares/sendCodeSMS.js";

const forgottenPasswordController = async (req, res) => {
    let { cpf, phone } = req.body;

    console.log('--- [POST /first-access] ---');
    console.log('Recebido:', { cpf, phone });

    if (!cpf || !phone) {
        return res.status(400).send({ message: "cpf and phone are required" });
    }

    // Formatar telefone para o padrão do Twilio para comparação
    phone = phone.trim();
    
    // Se já tem o prefixo +55, manter como está
    if (phone.startsWith('+55')) {
        // phone já está formatado
    } else {
        // Remover qualquer formatação e garantir que seja apenas números
        phone = phone.replace(/\D/g, '');
        
        // Se começar com 55 e tiver 13 dígitos (55 + 11 dígitos do celular brasileiro)
        // considera que já tem o código do país
        if (phone.startsWith('55') && phone.length === 13) {
            phone = `+${phone}`;
        } else {
            // Caso contrário, adiciona o +55
            phone = `+55${phone}`;
        }
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

        
        
        await sendCodeSMS(phone);

        return res.status(200).send({ message: "code sent" });

    } catch (err) {
        console.error("Erro no forgottenPasswordController:", err);
        return res.status(500).send({
            message: "Erro interno ao processar solicitação de recuperação de senha. Tente novamente mais tarde."
        });
    }
}

export default forgottenPasswordController;