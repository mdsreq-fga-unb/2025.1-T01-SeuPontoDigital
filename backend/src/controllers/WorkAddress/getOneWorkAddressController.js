import getOneWorkAddressModel from "../../models/WorkAddress/getOneWorkAddressModel.js";

const getOneWorkAddressController = async(req, res) => {
    const {addressID, employeeID} = req.body;

    try{
        const workAddressEmployee = await getOneWorkAddressModel(addressID, employeeID);

        if (!workAddressEmployee){
            return res.status(404).send({message: "not found any data in table work_address with these values"});
        }

        return res.status(200).json(workAddressEmployee);
    }
    catch(err){
        return res.status(500).send({message: "internal server error"});
    }
}

export default getOneWorkAddressController;