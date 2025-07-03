import supabase from "../../config/supabase.js";

const deleteOneWorkScheduleModel = async (idContract) => {

    try{
        const {error} = await supabase.from("work_schedules").delete().eq("id_contract", idContract);

        if (error) return error;
    }
    catch(err){
        console.error("error in deleteOneWorkScheduleModel")
    }
}

export default deleteOneWorkScheduleModel;