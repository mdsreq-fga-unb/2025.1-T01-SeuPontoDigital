import putOneWorkScheduleModel from "../../models/WorkSchedule/putOneWorkScheduleModel.js";

const putOneWorkScheduleController = async (req, res) => {

    const updateFieldsWorkSchedule = req.body;
    const idContract = req.params.id;

    try{
        const {error} = await putOneWorkScheduleModel(idContract, updateFieldsWorkSchedule);

        if (error) {
            return res.status(401).send({message: "error in uptade work schedule"});
        }

        return res.status(200).send({message: "work schedule updated"});
    }
    catch(err){
        return res.status(500).send({message: "internal server error"});
    }
}

export default putOneWorkScheduleController;