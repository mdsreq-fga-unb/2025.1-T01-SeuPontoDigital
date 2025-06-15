import supabase from "../../config/supabase.js";

const deleteContractModel = async (id) => {
    try{

        const {error: errorSignContract} = await supabase.from("sign_contract").delete().eq("id_contract", id);

        const {error: errorRegisterWorkLog} = await supabase.from("register_work_logs").delete().eq("id_contract", id);

        const {error: errorContract} = await supabase.from("contracts").delete().eq("id", id);
        
        if(errorSignContract) return errorSignContract;

         if(errorRegisterWorkLog) return errorRegisterWorkLog;

        if(errorContract) return errorContract;
    }
    catch(err){
        console.error("error in deleteContractModel");
    }
}

export default deleteContractModel;