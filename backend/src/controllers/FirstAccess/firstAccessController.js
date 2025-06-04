import getOneEmployeeFromCPF from "../../models/ContractEmployee/getOneEmployeeFromCPF.js";
// import getOneEmployerModel from "../../models/Employers/getOneEmployerModel.js";
import sendSMS from "../../middlewares/sendSMS.js";


const firstAccessController = async (req, res) => {

    const { name, cpf, phone } = req.body;

    try {
        const employee = await getOneEmployeeFromCPF(cpf);
        if (!employee) {
            return res.status(404).send({ message: "employee not found" });
        }
        if (name === employee.name && phone === employee.phone) {
            try {
                const verification = await sendSMS(phone);
                return res.status(200).send({
                    message: 'send!',
                    sid: verification.sid
                });
            } catch (error) {
                return res.status(500).send({ message: error.message });
            }
        } else {
            return res.status(400).send({ message: 'incorrect data' });
        }
    }
    catch (err) {

        try {

        }
        catch (err) {

        }
    }

}

export default firstAccessController;