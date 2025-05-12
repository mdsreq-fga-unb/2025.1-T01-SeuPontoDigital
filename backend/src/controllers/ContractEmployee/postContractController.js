import postContractModel from "../../models/ContractEmployee/postContractModel.js";
import validateCPF from "../../middlewares/validateCPF.js";

const postContractController = async (req, res) => {
    const data = req.body;
    try{
        if (validateCPF(data.cpf)) {
            const error = await postContractModel(data); 
            if (error) {
                return res.status(400).json({ message: "error when inserting contract" });
            }
            return res.status(201).json({ message: "contract inserted" });
        }
        return res.status(400).json({ message: "invalid cpf" })
    }
    catch(err){
        return res.status(500).send({message: `internal server error: ${err}`});
    }
}

export default postContractController;