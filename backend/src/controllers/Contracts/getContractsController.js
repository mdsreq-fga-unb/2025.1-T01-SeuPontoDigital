import getContractsModel from "../../models/ContractEmployee/getContractsModel.js";

const getContractsController = async (req, res) => {
    try{
        const data = await getContractsModel();
        if (data) {
            return res.status(200).json(data);
        }
        else {
            return res.status(404).json({ message: "contracts not found" });
        }
    }
    catch (err){
        return res.status(500).send({message: "internal server error" });
    }
}

export default getContractsController;