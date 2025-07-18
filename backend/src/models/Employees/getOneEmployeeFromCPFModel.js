import supabase from "../../config/supabase.js";

const getOneEmployeeFromCPFModel = async(cpf) => {

   try{
        const {data, error} = await supabase.from("employees").select("id, name, cpf, phone, password, created_at").eq("cpf", cpf).single();

        if (error) return;
       
        return data ;
    }
    catch (err){
        console.error("error in getOneEmployeeFromCPF");
    }
}

export default getOneEmployeeFromCPFModel;