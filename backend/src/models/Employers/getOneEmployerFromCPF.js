import supabase from "../../config/supabase.js";

const getOneEmployerFromCPF = async(cpf) => {

   try{
        const {data, error} = await supabase.from("employers").select("id, name, cpf, phone, password").eq("cpf", cpf).single();

        if (error) return;
       
        return data ;
    }
    catch (err){
        console.error("error in getOneEmployerFromCPF");
    }
}

export default getOneEmployerFromCPF;