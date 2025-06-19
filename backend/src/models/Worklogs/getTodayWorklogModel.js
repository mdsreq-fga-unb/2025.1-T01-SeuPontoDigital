import supabase from "../../config/supabase.js";

const getTodayWorklogModel = async (employeeId, contractId) => {
    const today = new Date().toISOString().split('T')[0];

    try {
        const {data, error} = await supabase
            .from('register_work_logs')
            .select('id_work_log, work_logs(date)')
            .eq('id_employee', employeeId)
            .eq('id_contract', contractId)
            .eq('work_logs.date', today)
            .single();

            if (error && error.code !== 'PGRST116') {
            console.error('Erro no getTodayWorklogModel: ', error.message);
            return {error: error.message};
            }

            if (data){
                return {data: data.id_work_log};
            }

            return {data: null};
    } catch (err) {
        console.error('Erro no getTodayModel: ', err.message);
        return {error: 'Erro interno do servidor ao buscar registro de ponto.'};
    }
};

export default getTodayWorklogModel;