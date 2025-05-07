import deleteEmployerByID from "../../models/Employers/deleteEmployerByID.js";

const deleteEmployerController = async (req, res) => {
    try {
        const { id } = req.params;
        const error = await deleteEmployerByID(id);
        if (error) {
            return res.status(400).json({ message: "one or more of the data sent is incorrect"});
        }
        return res.status(200).json({ message: "employer deleted" });
    }
    catch (err) {
        return res.status(500).send({message: "internal server error"});
    }
}

export default deleteEmployerController;