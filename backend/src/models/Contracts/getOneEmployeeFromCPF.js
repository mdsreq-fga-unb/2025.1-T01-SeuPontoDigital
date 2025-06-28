import supabase from "../../config/supabase.js";

const getOneEmployeeFromCPF = async (cpf) => {

    try{
        const {data, error} = await supabase.from("employees").select("id, name, cpf, phone, password").eq("cpf", cpf).single();

        if (error) return { error };
       
        // Remover +55 do telefone para exibição no frontend
        if (data && data.phone && data.phone.startsWith('+55')) {
            data.phone = data.phone.substring(3);
        }
       
        return data ;
    }
    catch (err){
        console.error("error in getOneEmployeeFromCPF");
    }
}

export default getOneEmployeeFromCPF;