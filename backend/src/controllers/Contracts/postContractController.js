import insertContract from "../../models/Contracts/insertContract.js";

const postContractController = async (req, res) => {
    try {
        const contract = req.body;
        const error = await insertContract(contract);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
    
        return res.status(201).json({ message: "contract inserted" });
    }
    catch (err) {
        console.error("error in postContract controller", err);
        throw err;
    }
}

export default postContractController;