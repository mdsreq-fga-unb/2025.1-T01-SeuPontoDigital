import supabase from "../../config/supabase.js";

const getOneWorkScheduleModel = async (idContract) => {

    try{
        const {data, error} = await supabase.from("work_schedules").select("*").eq("id_contract", idContract).single();

        if (error) return;

        return data;
    }
    catch(err){
        console.error("error in getOneWorkScheduleModel");
    }
}

export default getOneWorkScheduleModel;