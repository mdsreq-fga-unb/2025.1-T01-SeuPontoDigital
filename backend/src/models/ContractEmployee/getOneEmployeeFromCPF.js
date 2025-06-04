import supabase from "../../config/supabase.js";

const getOneEmployeeFromCPF = async (cpf) => {

    try{
        const {data, error} = await supabase.from("employee_contracts").select("name, cpf, phone").eq("cpf", cpf).single();

        if (error) return;
       
        return data ;
    }
    catch (err){
        console.error("error in getOneEmployeeFromCPF");
    }
}

export default getOneEmployeeFromCPF;