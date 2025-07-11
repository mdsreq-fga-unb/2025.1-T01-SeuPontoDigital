import getFullContractDataModel from "../../models/Contracts/getFullContractDataModel.js";

const getFullContractDataController = async (req, res) => {
    try {
        const contractID = req.params.id;

        const fullContractData = await getFullContractDataModel(contractID);

        if (!fullContractData) {
            return res.status(404).send({ message: "contract not found" });
        }

        return res.status(200).json(fullContractData);
    } catch (err) {
        console.error("Error in getFullContractDataController:", err);
        return res.status(500).send({ message: "internal server error" });
    }
};

export default getFullContractDataController;
