import supabase from "../../config/supabase.js";

const getAllWorkScheduleModel = async () => {

    try{

        const {data, error} = await supabase.from("work_schedules").select("*");

        if (error) return;

        return data;

    }
    catch(err){
        console.error("error in getAllWorkScheduleModel");
    }

}

export default getAllWorkScheduleModel;