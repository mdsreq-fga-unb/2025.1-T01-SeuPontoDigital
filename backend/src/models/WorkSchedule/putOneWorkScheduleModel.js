import supabase from "../../config/supabase.js";

const putOneWorkScheduleModel = async (idContract, updateFieldsWorkSchedule) => {

    try{
        const {error} = await supabase.from("work_schedules").update(updateFieldsWorkSchedule).eq("id_contract", idContract);

        if (error) return error;
    }
    catch(err){
        console.error("error in putOneWorkScheduleModel");
    }
}

export default putOneWorkScheduleModel;