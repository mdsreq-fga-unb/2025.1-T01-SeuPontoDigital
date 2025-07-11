import supabase from "../../config/supabase.js";

const postSignContractModel = async (employerID, employeeID, contractID, addressID) => {

    console.log("postSignContractModel called with:", { employerID, employeeID, contractID, addressID });

    try{
        const insertData = {
            id_employer: employerID,
            id_employee: employeeID,
            id_contract: contractID,
            id_address: addressID
        };

        console.log("Inserting sign contract data:", insertData);

        const {error} = await supabase.from("sign_contract").insert(insertData);

        if (error) {
            console.log("Supabase error in sign_contract insert:", error);
            return error;
        }
        
        console.log("Sign contract inserted successfully");
        return;
    }
    catch(err){
        console.error("error in postSignContractModel:", err);
        return err;
    }
}

export default postSignContractModel;