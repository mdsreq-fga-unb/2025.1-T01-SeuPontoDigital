import supabase from "../../config/supabase.js";

const putBreakModel = async (updateFieldsWorkBreak, idContract) => {

    try{
        const {error} = await supabase.from("fixed_breaks").update(updateFieldsWorkBreak).eq("id_contract", idContract);

        if (error){
            try{
                const {error} = await supabase.from("flex_breaks").update(updateFieldsWorkBreak).eq("id_contract", idContract);

                if (error) return error;

                return;
            }
            catch(err){
                console.error("error in putBreakModel");
            }
        }
    }
    catch(err){
        console.error("error in putBreakModel");
    }
}

export default putBreakModel;