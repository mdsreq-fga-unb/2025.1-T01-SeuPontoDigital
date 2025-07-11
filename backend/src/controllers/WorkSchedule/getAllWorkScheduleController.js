import getAllWorkScheduleModel from "../../models/WorkSchedule/getAllWorkScheduleModel.js";

const getAllWorkScheduleController = async (req, res) => {

    try{

        const allWorkSchedule = await getAllWorkScheduleModel();

        if (!allWorkSchedule) {
            return res.status(404).send({message: "not found data in table work_schedule"});
        }

        return res.status(200).json(allWorkSchedule);

    }
    catch(err){
        return res.status(500).send({message: "internal server error"});
    }

}

export default getAllWorkScheduleController;