import postEmployModel from "../../models/Employ/postEmployModel.js";

const postEmployController = async (req, res) => {
    const {employerID, employeeID} = req.body;

    try{
        const error = await postEmployModel(employerID, employeeID);
        if (error) {
            return res.status(401).send({message: "failed in insert data on table employ"});
        }
        return res.status(201).send({message: "inserted data in table employ"});
    }
    catch(err){
        return res.status(500).send({message: "internal server error"});
    }
}

export default postEmployController;