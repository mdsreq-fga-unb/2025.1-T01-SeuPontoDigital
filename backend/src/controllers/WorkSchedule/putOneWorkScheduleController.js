import putOneWorkScheduleModel from "../../models/WorkSchedule/putOneWorkScheduleModel.js";
import validateWorkSchedule from "../../middlewares/validateWorkSchedule.js";

const putOneWorkScheduleController = async (req, res) => {

    const updateFieldsWorkSchedule = req.body;
    const idContract = req.params.id;

    console.log("putOneWorkScheduleController - Contract ID:", idContract);
    console.log("putOneWorkScheduleController - Request body:", JSON.stringify(updateFieldsWorkSchedule, null, 2));

    try{
        const error = await putOneWorkScheduleModel(idContract, updateFieldsWorkSchedule);

        if (error) {
            console.error("Error updating work schedule:", error);
            return res.status(500).send({message: "error in update work schedule"});
        }

        return res.status(200).send({message: "work schedule updated"});
    }
    catch(err){
        console.error("Exception in putOneWorkScheduleController:", err);
        return res.status(500).send({message: "internal server error"});
    }
}

export { putOneWorkScheduleController, validateWorkSchedule };
export default putOneWorkScheduleController;