import { getOneFixedBreakModel, getOneFlexBreakModel } from "../../models/WorkBreaks/getOneBreakModel.js";

const getOneBreakController = async (req, res) => {

    const idContract = req.params.id;

    try{
        const fixedBreak = await getOneFixedBreakModel()
    }
    catch(err){
        return res.status(500).send({message: "internal server error"})
    }
}

export default getOneBreakController;