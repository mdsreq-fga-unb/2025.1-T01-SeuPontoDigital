import getOneContractModel from "../models/ContractEmployee/getOneContractModel.js";

const verifyDateContract = async (req, res, next) => {
    try {
        const contractID = req.params.id;
        const contract = await getOneContractModel(contractID);

        if (!contract) {
            return res.status(404).send({ message: "contract not found" });
        }
        
        const dateCreatedContract = new Date(contract.contract_start_date);
        const dateNow = new Date();
        const twoYearsInMilliseconds = 2 * 365 * 24 * 60 * 60 * 1000;

        if ((dateNow.getTime() - dateCreatedContract.getTime()) > twoYearsInMilliseconds) {
            req.id = contractID
            next(); 
        } 
        else {
            return res.status(403).send({ message: "created less than 2 years ago" });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message});
    }
   
}

export default verifyDateContract;