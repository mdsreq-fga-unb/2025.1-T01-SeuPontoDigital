import supabase from "../../config/supabase.js";

const getOneEmployerFromCPF = async(cpf) => {

   try{
        const {data, error} = await supabase.from("employers").select("id, name, cpf, phone, password").eq("cpf", cpf).single();

        if (error) return;
       
        // Remover +55 do telefone para exibição no frontend
        if (data && data.phone && data.phone.startsWith('+55')) {
            data.phone = data.phone.substring(3);
        }
       
        return data ;
    }
    catch (err){
        console.error("error in getOneEmployerFromCPF");
    }
}

export default getOneEmployerFromCPF;