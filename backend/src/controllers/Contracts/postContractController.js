import postContractModel from "../../models/Contracts/postContractModel.js";

const postContractController = async (req, res) => {
    const contract = req.body;

    try{
        const error = await postContractModel(contract); 
        if (error) {
            return res.status(400).json({ message: "failed to create contract" });
        }

        return res.status(201).json({ message: "contract has been added successfully" });
    }
    catch(err){
        return res.status(500).send({message: "internal server error" });
    }
}

export default postContractController;