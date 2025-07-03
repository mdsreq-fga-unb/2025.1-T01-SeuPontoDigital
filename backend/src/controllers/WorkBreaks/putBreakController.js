import putBreakModel from "../../models/WorkBreaks/putBreakModel.js";

const putBreakController = async (req, res) => {

    const idContract = req.params.id;
    const updateFieldsWorkBreak = req.body;

    try{
        const {error} = await putBreakModel(updateFieldsWorkBreak, idContract);

        if (error){
            return res.status(401).send({message: "error in uptade work break"});
        }

        return res.status(200).send({message: "updated work break"});
    }
    catch(err){
        return res.status(500).send({message: "internal server error"});
    }   
}

export default putBreakController;