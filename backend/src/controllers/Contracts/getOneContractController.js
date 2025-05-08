import getOneContractByID from "../../models/Contracts/getOneContractByID.js";

const getOneContractController = async (req, res) => {
    try {
        const {id} = req.params
        const data = await getOneContractByID(id);
        if (data) {
            return res.status(200).json(data)
        }
        else {
            return res.status(404).json({ message: "not found contract" })
        }
    }
    catch (err) {
        console.log("error in getOneContractController controller:", err);
        throw err;
    }
}
export default getOneContractController;
