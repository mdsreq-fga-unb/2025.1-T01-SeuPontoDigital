import getOneContractModel from "../../models/ContractEmployee/getOneContractModel.js";

const getOneContractController = async (req, res) => {
    try {
        const data = await getOneContractModel(req.params.id);

        if (data) {
            return res.status(200).json(data)
        }
        else {
            return res.status(404).json({ message: "not found contract" })
        }
    }
    catch (err) {
        return res.status(500).send({message: "internal server error"});
    }
}
export default getOneContractController;