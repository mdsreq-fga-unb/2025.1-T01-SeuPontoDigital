import supabase from "../../config/supabase.js";

const deleteContractModel = async (id) => {
    try{
        // Excluir registros relacionados primeiro (foreign keys)
        const {error: errorSignContract} = await supabase.from("sign_contract").delete().eq("id_contract", id);
        if(errorSignContract) {
            console.error("Error deleting sign_contract:", errorSignContract);
            return errorSignContract;
        }

        const {error: errorRegisterWorkLog} = await supabase.from("register_work_logs").delete().eq("id_contract", id);
        if(errorRegisterWorkLog) {
            console.error("Error deleting register_work_logs:", errorRegisterWorkLog);
            return errorRegisterWorkLog;
        }

        const {error: errorFixedBreaks} = await supabase.from("fixed_breaks").delete().eq("id_contract", id);
        if(errorFixedBreaks) {
            console.error("Error deleting fixed_breaks:", errorFixedBreaks);
            return errorFixedBreaks;
        }

        const {error: errorFlexBreaks} = await supabase.from("flex_breaks").delete().eq("id_contract", id);
        if(errorFlexBreaks) {
            console.error("Error deleting flex_breaks:", errorFlexBreaks);
            return errorFlexBreaks;
        }

        const {error: errorWorkSchedules} = await supabase.from("work_schedules").delete().eq("id_contract", id);
        if(errorWorkSchedules) {
            console.error("Error deleting work_schedules:", errorWorkSchedules);
            return errorWorkSchedules;
        }

        // Excluir o contrato por último
        const {data, error: errorContract} = await supabase.from("contracts").delete().eq("id", id);
        if(errorContract) {
            console.error("Error deleting contract:", errorContract);
            return errorContract;
        }

        console.log("Contract deleted successfully:", data);
        return null; // Retorna null explicitamente quando tudo der certo
    }
    catch(err){
        console.error("error in deleteContractModel:", err);
        return err;
    }
}

export default deleteContractModel;