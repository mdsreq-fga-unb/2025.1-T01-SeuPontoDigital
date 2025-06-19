import supabase from "../../config/supabase.js";

const postWorklogModel = async (data) => {
    let newWorklogId = null;

    try{
        const { data: worklogData, error: worklogError } = await supabase
            .from('work_logs')
            .insert({
                date: data.date,
                clock_in: data.clock_in,
                clock_out: null,
                break_start: null,
                break_end: null,
            })
            .select('id')
            .single();

        if (worklogError || !worklogData) {
            console.error('Erro ao inserir work log: ', worklogError?.message);
            return { error: worklogError?.message || 'Falha ao registrar ponto.'};
        }

        newWorklogId = worklogData.id;

        const { error: registerError } = await supabase
            .from('register_work_logs')
            .insert({
                id_employee: data.employeeId,
                id_contract: data.contractId,
                id_work_log: newWorklogId,
            });

        if (registerError) {
            console.error('Erro ao registrar vinculo de work log: ', registerError.message);
            const { error: rollbackError } = await supabase
                .from('work_logs')
                .delete()
                .eq('id', newWorklogId);

            if (rollbackError){
                console.error('Erro de rollback: Falha ao deletar work log: ', rollbackError.message);
            }

            return { error: 'Falha ao vincular registro de ponto. Rollback executado.' };
        }

        return { data: { id: newWorklogId } };
    } catch (err){
        console.error('Erro inesperado no postWorklogModel: ', err.message);
        if (newWorklogId) {
            const {error: rollbackError } = await supabase
                .from('work_logs')
                .delete()
                .eq('id', newWorklogId);

            if (rollbackError){
                console.error('Erro de rollback (catch): Falha ao deletar work log: ', rollbackError.message);
            }
        }
        return { error: 'Erro interno do servidor ao criar registro de ponto.' };
    }
};

export default postWorklogModel;