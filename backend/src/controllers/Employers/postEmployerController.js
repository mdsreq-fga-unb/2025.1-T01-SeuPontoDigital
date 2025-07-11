import validateCPF from "../../middlewares/validateCPF.js";
import postEmployerModel from "../../models/Employers/postEmployerModel.js";

const postEmployerController = async (req, res) => {
    try {
        const employer = req.body;
        
        console.log("Received employer data:", employer);

        if (validateCPF(employer.cpf)) {
            const error = await postEmployerModel(employer);
            
            if (error) {
                console.error("Error creating employer:", error);
                return res.status(400).json({ message: "failed to create employer", error: error.message || error });
            }
            
            return res.status(201).json({ message: "employer has been added successfully" });
        }

        return res.status(400).json({ message: "invalid cpf" });
    }
    catch (err) {
        console.error("Exception in postEmployerController:", err);
        return res.status(500).send({message: "internal server error"});
    }
}

export default postEmployerController;