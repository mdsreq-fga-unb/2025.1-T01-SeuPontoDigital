import supabase from "../../config/supabase.js"

const getOneFixedBreakModel = async (idContract) => {
    
    try{
        const {data, error} = await supabase.from("fixed_breaks").select("*").eq("id_contract", idContract);

        if (error) return;

        return data;
    }
    catch(err){
        console.error("error in getOneFixedBreakModel");
    }
}

const getOneFlexBreakModel = async (idContract) => {
    
    try{
        const {data, error} = await supabase.from("flex_breaks").select("*").eq("id_contract", idContract);

        if (error) return;

        return data;
    }
    catch(err){
        console.error("error in getOneFlexBreakModel");
    }
}

export {getOneFixedBreakModel, getOneFlexBreakModel};