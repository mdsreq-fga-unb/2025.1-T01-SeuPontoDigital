import deleteContractByID from "../../models/Contracts/deleteContractByID.js";

const deleteContractController = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const error = await deleteContractByID(id);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(200).json({ message: "contract deleted" });
    }
    catch (err) {
        console.error("error in deleteContract controller:", err);
        throw err;
    }
}

export default deleteContractController;