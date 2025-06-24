import postWorkAddressModel from "../../models/WorkAddress/postWorkAddressModel.js";

const postWorkAddressController = async (req, res) => {

    const { addressID, employeeID } = req.body;

    try{
        const error = await postWorkAddressModel(addressID, employeeID)

        if (error) return res.status(401).send({message: "error in postWorkAddressController"});

        return res.status(201).send({message: "inserted workAddress"});
    }
    catch(err){
        return res.status(500).send({message: "internal server error"});
    }
}

export default postWorkAddressController;