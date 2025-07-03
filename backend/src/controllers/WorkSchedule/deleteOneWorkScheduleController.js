import deleteOneWorkScheduleModel from "../../models/WorkSchedule/deleteOneWorkScheduleModel.js";

const deleteOneWorkScheduleController = async (req, res) =>{

    const idContract = req.params.id;

    try{
        const error = await deleteOneWorkScheduleModel(idContract);

        if (error){
            return res.status(401).send({message: "error in delete work_schedule"});
        }

        return res.status(200).send({message: "work_schedule deleted"});
    }
    catch(err){
        return res.status(500).send({message: "internal server error"});
    }
}

export default deleteOneWorkScheduleController;