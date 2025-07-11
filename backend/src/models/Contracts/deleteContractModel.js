import supabase from "../../config/supabase.js";

const deleteContractModel = async (id) => {
    try{
        // Excluir registros relacionados primeiro (foreign keys)
        const {error: errorSignContract} = await supabase.from("sign_contract").delete().eq("id_contract", id);

        const {error: errorRegisterWorkLog} = await supabase.from("register_work_logs").delete().eq("id_contract", id);

        const {error: errorFixedBreaks} = await supabase.from("fixed_breaks").delete().eq("id_contract", id);

        const {error: errorFlexBreaks} = await supabase.from("flex_breaks").delete().eq("id_contract", id);

        const {error: errorWorkSchedules} = await supabase.from("work_schedules").delete().eq("id_contract", id);

        // Excluir o contrato por último
        const {error: errorContract} = await supabase.from("contracts").delete().eq("id", id);
        
        if(errorSignContract) return errorSignContract;
        if(errorRegisterWorkLog) return errorRegisterWorkLog;
        if(errorFixedBreaks) return errorFixedBreaks;
        if(errorFlexBreaks) return errorFlexBreaks;
        if(errorWorkSchedules) return errorWorkSchedules;
        if(errorContract) return errorContract;
    }
    catch(err){
        console.error("error in deleteContractModel:", err);
        return err;
    }
}

export default deleteContractModel;