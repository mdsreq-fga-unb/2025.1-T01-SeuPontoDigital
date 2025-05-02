import supabase from "../config/supabase.js";

const insertEmployee = async (employee) => {
    try{
        const {error} = await supabase.from("employees").insert({
            name: employee.name,
            cpf:employee.cpf,
            date_birth:employee.date_birth,
            address: employee.address
        })
        if(error){
            return error;
        }
        return;
    }
    catch(err){
        console.error("error in insertEmployee models:", err);
        throw err;
    }
}

export default insertEmployee;