import supabase from "../../config/supabase.js";

const insertEmployer = async (employer) => {
    try{
        const {error} = await supabase.from("employers").insert({
            name: employer.name,
            cpf:employer.cpf,
            email:employer.email,
            date_birth:employer.date_birth,
            address: employer.address
        });
        if (error) return error;
    }
    catch(err){
        console.error("error in insertEmployer models:", err);
        throw err;
    }
}   

export default insertEmployer;