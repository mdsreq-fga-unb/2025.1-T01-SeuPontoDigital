import getContracts from "../../models/Contracts/getContractsList.js";

const getContractsListController = async (req, res) => {

    try {
        const data = await getContracts();
        if (data) {
            return res.status(200).json(data)
        }
        else {
            return res.status(404).json({ message: "not found contracts" })
        }
    }
    catch (err) {
        console.log("error in getContracts controller:", err);
        throw err;
    }
}

export default getContractsListController;