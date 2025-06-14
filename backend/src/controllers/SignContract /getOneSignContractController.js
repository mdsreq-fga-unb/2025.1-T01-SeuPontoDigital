import getOneSignContractModel from "../../models/SignContract/getOneSignContractModel.js";

const getOneSignContractController = async (req, res) => {
    try {
        const {employerID, employeeID, contractID, addressID} = req.body;

        const signContract = getOneSignContractModel(employerID, employeeID, contractID, addressID);

        if (!signContract){
            return res.status(404).send({message: "not found contract in table sign_contract white these data"});
        }

        return res.status(200).json(signContract);
    }
    catch(err){
        return res.status(500).send({message: "internal server error"})
    }
        
}

export default getOneSignContractController;
