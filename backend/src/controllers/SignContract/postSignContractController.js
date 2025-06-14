import postSignContractModel from "../../models/SignContract/postSignContractModel.js";

const postSignContractController = async (req, res) => {

    const { employerID, employeeID, contractID } = req.body;

    try{
        const error = await postSignContractModel(employerID, employeeID, contractID);
        if (error) {
            return res.status(401).send({message: "failed to insert data in table sign_contract"});
        }
        return res.status(201).send({message: "inserted data in table sign_contract"});
    }
    catch(err){
        return res.status(500).send({message: "internal server error"});
    }
}

export default postSignContractController;