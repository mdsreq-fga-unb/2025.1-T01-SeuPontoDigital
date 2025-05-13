import validateCPF from "../../middlewares/validateCPF.js";
import putEmployerModel from "../../models/Employers/putEmployerModel.js";

const putEmployerController = async (req, res) => {
    try {
        const { id } = req.params;
        const updateDataEmployer = req.body;

        if (updateDataEmployer.cpf && !validateCPF(updateDataEmployer.cpf))
            return res.status(400).json({ message: "invalid cpf" });

        const error = await putEmployerModel(id, updateDataEmployer);
        if (error) {
            return res.status(500).json({message: "internal server error"});
        }
        return res.status(200).json({ message: "updated employer" });
    }
    catch (err) {
        return res.status(500).send({message: "internal server error"});
    }
}

export default putEmployerController;