import postContractModel from "../../models/ContractEmployee/postContractModel.js";
import validateCPF from "../../middlewares/validateCPF.js";

const postContractController = async (req, res) => {
    const data = req.body;

    try{
        if (validateCPF(data.cpf)) {

            const error = await postContractModel(data); 
            if (error) {
                return res.status(400).json({ message: "failed to create contract" });
            }

            return res.status(201).json({ message: "contract has been added successfully" });
        }

        return res.status(400).json({ message: "invalid cpf" });
    }
    catch(err){
        return res.status(500).send({message: "internal server error" });
    }
}

export default postContractController;