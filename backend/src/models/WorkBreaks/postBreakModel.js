import supabase from "../../config/supabase.js";

const postBreakModel = async (workBreak, idContract) => {

    try{
        if (workBreak.type === 'flex'){
            const {error} = await supabase.from("flex_breaks").insert({
                id_contract: idContract,
                duration_minutes: workBreak.duration_minutes
            })

            if (error) return error;

            return;
        }

        if (workBreak.type === 'fixed'){
            const {error} = await supabase.from("fixed_breaks").insert({
                id_contract: idContract,
                break_start: workBreak.break_start,
                break_end: workBreak.break_end
            })

            if (error) return error;

            return;
        }

        return -1;
    }
    catch(err){
        console.error("error in postBreakModel");
    }
}

export default postBreakModel;