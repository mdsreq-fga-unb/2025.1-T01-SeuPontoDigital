import getAllSignContractModel from "../../models/SignContract/getAllSignContractModel.js";

const getAllSignContractController = async(req, res) => {

    try{
        const allSignContract = await getAllSignContractModel();
        if(!allSignContract){
            return res.status(404).send({message: "not found data in table sign_contract"});
        }
        return res.status(200).json(allSignContract);
    }
    catch(err){
        return res.status(500).send({message: "internal server error"});
    }

}

export default getAllSignContractController;