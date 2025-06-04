import getOneEmployeeFromCPF from "../../models/ContractEmployee/getOneEmployeeFromCPF.js";
import getOneEmployerFromCPF from "../../models/Employers/getOneEmployerFromCPF.js";
import sendSMS from "../../middlewares/sendSMS.js";

const firstAccessController = async (req, res) => {
    const { name, cpf, phone } = req.body;

    if (!name || !cpf || !phone) {
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
            return res.status(404).send({ message: "user not found" });
        }

        if (user.name !== name || user.phone !== phone) {
            return res.status(400).send({ message: "incorrect data" });
        }

        if (user.password) {
            return res.status(401).send({ message: `${userType} already has an account` });
        }

        await sendSMS(phone);

        return res.status(200).send({ message: "send code" });

    } catch (err) {
        return res.status(500).send({ message: "internal server error" });
    }
}

export default firstAccessController;