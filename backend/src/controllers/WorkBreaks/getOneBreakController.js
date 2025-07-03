import { getOneFixedBreakModel, getOneFlexBreakModel } from "../../models/WorkBreaks/getOneBreakModel.js";

const getOneBreakController = async (req, res) => {

    const idContract = req.params.id;

    try{
        const fixedBreak = await getOneFixedBreakModel(idContract);
        if (!fixedBreak){
            try{
                const flexBreak = await getOneFlexBreakModel(idContract);

                if (!flexBreak){
                    return res.status(404).send({message: "not found break for these data"});
                }

                return res.status(200).json(flexBreak);
            }
            catch(err){
                return res.status(500).send({message: "internal server error"})
            }
        }

        return res.status(200).json(fixedBreak);
    }
    catch(err){
        return res.status(500).send({message: "internal server error"})
    }
}

export default getOneBreakController;