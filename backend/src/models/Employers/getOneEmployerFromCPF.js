import supabase from "../../config/supabase.js";

const getOneEmployerFromCPF = async(cpf) => {

   try{
        // return { data: { id: 1, cpf, password: '$2b$10$8NS1FB0FkAuO7UW8MZ.Tr.SL71BdqMYAXqQtMMMMVSrKuR4H96Oqi', phone: '61999999999' }, error: null };
        // const {data, error} = await supabase.from("employers").select("id, name, cpf, phone, password").eq("cpf", cpf).single();
        return {data: null, error: null};

        if (error) return;
       
        return data ;
    }
    catch (err){
        console.error("error in getOneEmployerFromCPF");
    }
}

export default getOneEmployerFromCPF;

