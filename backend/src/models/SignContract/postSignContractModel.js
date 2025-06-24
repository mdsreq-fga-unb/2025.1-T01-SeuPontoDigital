import supabase from "../../config/supabase.js";

const postSignContractModel = async (employerID, employeeID, contractID) => {

    try{
        const {error} = await supabase.from("sign_contract").insert({
            id_employer: employerID,
            id_employee: employeeID,
            id_contract: contractID
        });

        if (error) return error;
        
        return;
    }
    catch(err){
        console.error("error in postSignContractModel");
    }
}

export default postSignContractModel;