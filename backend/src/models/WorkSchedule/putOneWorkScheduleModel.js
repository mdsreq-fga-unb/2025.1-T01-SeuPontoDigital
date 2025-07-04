import supabase from "../../config/supabase.js";

const putOneWorkScheduleModel = async (idContract, updateFieldsWorkSchedule) => {
    try{
        const {error} = await supabase.from("work_schedules").update(updateFieldsWorkSchedule).eq("id_contract", idContract);

        if (error) {
            console.error("Error in putOneWorkScheduleModel:", error);
            return error;
        }
        
        return null; // Sucesso
    }
    catch(err){
        console.error("Exception in putOneWorkScheduleModel:", err);
        return err;
    }
}

export default putOneWorkScheduleModel;