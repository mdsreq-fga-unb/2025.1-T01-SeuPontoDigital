import supabase from "../../config/supabase.js";

const postWorkScheduleModel = async (workSchedule, idContract) => {

    try{
        const {error} = await supabase.from("work_schedules").insert({
           id_contract: idContract,
           type: workSchedule.type,
           monday_start: workSchedule.monday_start || null,
           monday_end: workSchedule.monday_end || null,
           tuesday_start: workSchedule.tuesday_start || null,
           tuesday_end: workSchedule.tuesday_end || null,
           wednesday_start: workSchedule.wednesday_start || null,
           wednesday_end: workSchedule.wednesday_end || null,
           thursday_start: workSchedule.thursday_start || null,
           thursday_end: workSchedule.thursday_end || null,
           friday_start: workSchedule.friday_start || null,
           friday_end: workSchedule.friday_end || null,
           saturday_start: workSchedule.saturday_start || null,
           saturday_end: workSchedule.saturday_end || null,
           sunday_start: workSchedule.sunday_start || null,
           sunday_end: workSchedule.sunday_end || null
        })

        if (error) return error;
    }
    catch(err){
        console.error("error in postWorkScheduleModel");
    }
}

export default postWorkScheduleModel;