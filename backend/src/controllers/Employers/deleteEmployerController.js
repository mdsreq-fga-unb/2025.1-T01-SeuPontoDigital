import deleteEmployerByID from "../../models/Employers/deleteEmployerByID.js";

const deleteEmployerController = async (req, res) => {
    try {
        const { id } = req.params;
        const error = await deleteEmployerByID(id);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(200).json({ message: "employer deleted" });
    }
    catch (err) {
        console.error("error in deleteEmployer controller:", err);
        throw err;
    }
}

export default deleteEmployerController;