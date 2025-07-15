import postWorkScheduleModel from "../../models/WorkSchedule/postWorkScheduleModel.js";
import validateWorkSchedule from "../../middlewares/validateWorkSchedule.js";

const postWorkScheduleController = async (req, res) => {

    const idContract = req.params.id
    const workSchedule = req.body

    try{
        const error = await postWorkScheduleModel(workSchedule, idContract);

        if (error) {
            return res.status(400).send({message: "error in create work_schedule"});
        }

        return res.status(201).send({message: "work_schedule created"});
    }
    catch(err){
        return res.status(500).send({message: "internal server error"});
    }
}

export { postWorkScheduleController, validateWorkSchedule };
export default postWorkScheduleController;