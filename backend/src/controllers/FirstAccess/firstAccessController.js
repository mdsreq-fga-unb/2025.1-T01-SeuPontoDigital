import getOneEmployeeFromCPF from "../../models/ContractEmployee/getOneEmployeeFromCPF.js";
import getOneEmployerFromCPF from "../../models/Employers/getOneEmployerFromCPF.js";
import sendSMS from "../../middlewares/sendSMS.js";

const firstAccessController = async (req, res) => {
    let { name, cpf, phone, password } = req.body;
    
    // Formatar telefone para o padrão do Twilio
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
            return res.status(400).send({ message: "O número de celular digitado não pertence a esse CPF!" });
        }
        
        if (user.password) {
            return res.status(401).send({ message: `Você já possui uma conta!` });
        }

        try {
            await sendSMS(phone);
        } catch (smsErr) {
            return res.status(500).send({ message: "Erro ao enviar SMS" });
        }

        return res.status(200).send({ message: "Código enviado!" });

    } catch (err) {
        return res.status(500).send({ message: "Erro interno do servidor" });
    }
}

export default firstAccessController;