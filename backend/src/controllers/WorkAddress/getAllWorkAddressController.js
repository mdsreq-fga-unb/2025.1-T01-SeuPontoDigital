import getAllWorkAddressModel from "../../models/WorkAddress/getAllWorkAddressModel.js";

const getAllWorkAddressController = async (req, res) => {

    try{
        const allWorkAddress = await getAllWorkAddressModel();

        if (!allWorkAddress){
            return res.status(404).send({message: "not found data in table work_address"});
        }

        return res.status(200).json(allWorkAddress);
    }
    catch(err){
        return res.status(500).send({message: "internal server error"});
    }

}

export default getAllWorkAddressController;