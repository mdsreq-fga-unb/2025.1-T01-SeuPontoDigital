import supabase from "../../config/supabase.js";

const getOneEmployerFromCPF = async(cpf) => {

   try{
        return { data: { id: 1, cpf, password: '$2b$10$fakehash', phone: '61999999999' }, error: null };
        // const {data, error} = await supabase.from("employers").select("id, name, cpf, phone, password").eq("cpf", cpf).single();

        if (error) return;
       
        return data ;
    }
    catch (err){
        console.error("error in getOneEmployerFromCPF");
    }
}

export default getOneEmployerFromCPF;

