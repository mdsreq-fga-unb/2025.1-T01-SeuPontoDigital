import getContractsModel from "../../models/Contracts/getContractsModel.js";

const getContractsController = async (req, res) => {
    try{
        const contract = await getContractsModel();

        if(!contract){
            return res.status(404).json({ message: "contracts not found" });
        }
        return res.status(200).json(contract);
    }
    catch (err){
        return res.status(500).send({message: "internal server error" });
    }
}

export default getContractsController;