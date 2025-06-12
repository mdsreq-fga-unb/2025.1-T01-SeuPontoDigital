import supabase from "../../config/supabase.js";

const postEmployModel = async (employerID, employeeID) => {

    try{
        const {error} = await supabase.from("employ").insert({
            id_employer: employerID,
            id_employee: employeeID
        });
        if (error) return error;

        return;
    }
    catch(err){
        console.error("error in postEmployModel");
    }
}

export default postEmployModel;