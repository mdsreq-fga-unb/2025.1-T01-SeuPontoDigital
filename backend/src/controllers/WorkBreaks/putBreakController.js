import putBreakModel from "../../models/WorkBreaks/putBreakModel.js";

const putBreakController = async (req, res) => {

    const idContract = req.params.id;
    const updateFieldsWorkBreak = req.body;

    console.log("putBreakController - Contract ID:", idContract);
    console.log("putBreakController - Request body:", JSON.stringify(updateFieldsWorkBreak, null, 2));

    try{
        const error = await putBreakModel(updateFieldsWorkBreak, idContract);

        if (error){
            console.error("Error updating work break:", error);
            return res.status(500).send({message: "error in update work break"});
        }

        return res.status(200).send({message: "updated work break"});
    }
    catch(err){
        console.error("Exception in putBreakController:", err);
        return res.status(500).send({message: "internal server error"});
    }   
}

export default putBreakController;