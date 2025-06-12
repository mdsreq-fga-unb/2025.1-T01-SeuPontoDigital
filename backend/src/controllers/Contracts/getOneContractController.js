import getOneContractModel from "../../models/Contracts/getOneContractModel.js";

const getOneContractController = async (req, res) => {
    try {
        const contractID = req.params.id

        const contract = await getOneContractModel(contractID);

        if (!contract){
            return res.status(404).json({ message: "contract not found" });
        }
        return res.status(200).json(contract);
    }
    catch (err) {
        return res.status(500).send({message: "internal server error" });
    }
}
export default getOneContractController;