import validateCPF from "../../middlewares/validateCPF.js";
import putContractModel from "../../models/ContractEmployee/putContractModel.js";

const putContractController = async (req, res) => {
    try {
        const  id  = req.params.id;
        const updateDataContract = req.body;

        if (updateDataContract.cpf && !validateCPF(updateDataContract.cpf))
            return res.status(400).json({ message: "invalid cpf" });

        const error = await putContractModel(id, updateDataContract);
        if (error) {
            return res.status(500).json({message: "internal server error"});
        }
        return res.status(200).json({ message: "updated contract" });
    }
    catch (err) {
        return res.status(500).send({message: "internal server error"});
    }
}

export default putContractController;