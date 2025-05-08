import getContractsFromDB from "../../models/Contracts/getContractsFromDB.js";

const getContractsController = async (req, res) => {

    try {
        const data = await getContractsFromDB();
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

export default getContractsController;