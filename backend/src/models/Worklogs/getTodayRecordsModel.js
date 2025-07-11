import supabase from "../../config/supabase.js";

const getTodayRecordsModel = async (employeeId, contractId) => {
    const today = new Date().toISOString().split('T')[0];

    try {
        const { data: workLogData, error } = await supabase
            .from('work_logs')
            .select(`
                clock_in,
                break_start,
                break_end,
                clock_out,
                register_work_logs!inner(id_contract, id_employee)
            `)
            .eq('date', today)
            .eq('register_work_logs.id_employee', employeeId)
            .eq('register_work_logs.id_contract', contractId)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error("Erro ao buscar registro de ponto de hoje:", error.message);
            throw new Error(error.message);
        }

        if (workLogData) {
            const todayRecords = {
                entrada: workLogData.clock_in ? true : false,
                saidaAlmoco: workLogData.break_start ? true : false,
                voltaAlmoco: workLogData.break_end ? true : false,
                saida: workLogData.clock_out ? true : false,
            };

            const recordDetails = {
                date: new Date().toLocaleDateString('pt-BR'), 
                records: []
            };
            if (workLogData.clock_in) recordDetails.records.push({ type: 'Entrada', time: workLogData.clock_in.substring(0, 5)});
            if (workLogData.break_start) recordDetails.records.push({ type: 'Saída Almoço', time: workLogData.break_start.substring(0, 5)});
            if (workLogData.break_end) recordDetails.records.push({ type: 'Volta Almoço', time: workLogData.break_end.substring(0, 5)});
            if (workLogData.clock_out) recordDetails.records.push({ type: 'Saída', time: workLogData.clock_out.substring(0, 5)});

            return { data: { todayRecords, recordDetails }, error: null };
        }
        
        return { 
            data: { 
                todayRecords: { entrada: false, saidaAlmoco: false, voltaAlmoco: false, saida: false },
                recordDetails: null 
            }, 
            error: null 
        };

    } catch (err) {
        console.error("Erro inesperado em getTodayRecordsModel:", err.message);
        return { data: null, error: "Erro interno do servidor." };
    }
};

export default getTodayRecordsModel;
