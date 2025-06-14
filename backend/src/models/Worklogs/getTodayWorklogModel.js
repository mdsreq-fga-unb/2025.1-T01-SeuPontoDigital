import supabase from "../../config/supabase.js";

const getTodayWorklogModel = async (employeeId, date) => {
    try {
        const {data, error} = await supabase
            .from('register_work_logs')
            .select('id_work_log, work_logs(date)')
            .eq('id_employee', employeeId)
            .not('id_work_log', 'is', null)
            .single();

            if (error && error.code !== 'PGRST116') {
            console.error('Erro no getTodayWorklogModel: ', error.message);
            return {error: error.message};
            }

            if (data && data.work_logs && data.work_logs.date === date){
                return {data: data.id_work_log};
            }

            return {data: null};
    } catch (err) {
        console.error('Erro no getTodayModel: ', err.message);
        return {error: 'Erro interno do servidor ao buscar registro de ponto.'};
    }
};

export default getTodayWorklogModel;