import supabase from "../../config/supabase.js";

const postWorkAddressModel = async (addressID, employeeID) => {
    try{
        const {error} = await supabase.from("work_address").insert({
            id_address: addressID,
            id_employee: employeeID
        });

        if (error) return error;
    }
    catch (err){
        console.error("error in postWorkAddressModel");
    }

}

export default postWorkAddressModel;