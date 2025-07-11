import postContractModel from "../../models/Contracts/postContractModel.js";

const postContractController = async (req, res) => {
    const contract = req.body;

    try{
        console.log("Received contract data:", contract);
        
        // Validação básica dos campos obrigatórios
        if (!contract.function || !contract.salary) {
            console.error("Missing required fields:", { function: contract.function, salary: contract.salary });
            return res.status(400).json({ message: "function and salary are required fields" });
        }
        
        const contractId = await postContractModel(contract); 
        if (!contractId) {
            console.error("Failed to create contract - no ID returned");
            return res.status(400).json({ message: "failed to create contract" });
        }

        console.log("Contract created with ID:", contractId);
        return res.status(201).json({ 
            message: "contract has been added successfully",
            contractId: contractId
        });
    }
    catch(err){
        console.error("Error in postContractController:", err);
        return res.status(500).send({message: "internal server error" });
    }
}

export default postContractController;