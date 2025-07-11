import postBreakModel from "../../models/WorkBreaks/postBreakModel.js";

const postBreakController = async (req, res) => {

    const idContract = req.params.id;
    const workBreak = req.body;

    try{
        const error = await postBreakModel(workBreak, idContract);

        if (error){
            return res.status(400).send({message: "failed in create a new work break"});
        }

        return res.status(201).send({message: "work break created"});
    }
    catch(err){
        return res.status(500).send({message: "internal server error"});
    }
}

export default postBreakController;