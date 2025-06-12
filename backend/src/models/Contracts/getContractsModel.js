import supabase from "../../config/supabase.js";

const getContractsModel = async () => {
    try{
        const {data, error} = await supabase.from("employee_contracts").select("*, employer: employer_id(id, name)");

        if (error)  return { error };
        
        // Remover +55 do telefone para exibição no frontend
        if (data) {
            data.forEach(contract => {
                if (contract.phone && contract.phone.startsWith('+55')) {
                    contract.phone = contract.phone.substring(3);
                }
            });
        }
           
        return data ;
    }
    catch (err){
        console.error("error in getContractsModel");
    }
}

export default getContractsModel;