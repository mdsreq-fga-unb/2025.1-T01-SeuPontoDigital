import postSignContractModel from "../../models/SignContract/postSignContractModel.js";

const postSignContractController = async (req, res) => {

    const { employerID, employeeID, contractID, addressID } = req.body;

    console.log("Received sign contract request:", { employerID, employeeID, contractID, addressID });

    if (!employerID || !employeeID || !contractID || !addressID) {
        console.log("Missing required fields for sign contract");
        console.log("employerID:", employerID);
        console.log("employeeID:", employeeID);
        console.log("contractID:", contractID);
        console.log("addressID:", addressID);
        return res.status(400).send({message: "employerID, employeeID, contractID, and addressID are required"});
    }

    try{
        const error = await postSignContractModel(employerID, employeeID, contractID, addressID);
        if (error) {
            console.log("Error from postSignContractModel:", error);
            return res.status(401).send({message: "failed to insert data in table sign_contract", error});
        }
        console.log("Sign contract created successfully");
        return res.status(201).send({message: "inserted data in table sign_contract"});
    }
    catch(err){
        console.log("Exception in postSignContractController:", err);
        return res.status(500).send({message: "internal server error"});
    }
}

export default postSignContractController;