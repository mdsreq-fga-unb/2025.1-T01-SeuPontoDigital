import getAllEmployModel from "../../models/Employ/getAllEmployModel.js";

const getAllEmployController = async (req, res) => {

    try{
        const allEmploy = await getAllEmployModel();
        if (!allEmploy){
            return res.status(404).send({message: "not found data in table employ"});
        }
        return res.status(200).json(allEmploy);
    }
    catch(err){
        return res.status(500).send({message: "internal server error"});
    }
}

export default getAllEmployController;