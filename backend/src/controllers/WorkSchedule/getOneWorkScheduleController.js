import getOneWorkScheduleModel from "../../models/WorkSchedule/getOneWorkScheduleModel.js";

const getOneWorkScheduleController = async (req, res) => {

    const idController = req.params.id

    try{
        const oneWorkSchedule = await getOneWorkScheduleModel(idController);

        if (!oneWorkSchedule){
            return res.status(404).send({message: "not found work_schedule with these data"});
        }

        return res.status(200).json(oneWorkSchedule);
    }
    catch(err){
        return res.status(500).send({message: "internal server error"});
    }
}

export default getOneWorkScheduleController;