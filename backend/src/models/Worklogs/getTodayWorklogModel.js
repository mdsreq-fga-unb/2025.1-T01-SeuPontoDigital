import supabase from "../../config/supabase.js";

const getTodayWorklogModel = async (employeeId, contractId) => {
  try {
    // Obter a data atual no formato 'YYYY-MM-DD'
    const today = new Date().toISOString().split('T')[0];
    
    // Consulta para encontrar um registro de ponto do funcionário para o contrato específico na data atual
    const { data, error } = await supabase
      .from('register_work_logs')
      .select(`
        id_work_log,
        work_logs!inner(date)
      `)
      .eq('id_employee', employeeId)
      .eq('id_contract', contractId)
      .eq('work_logs.date', today)
      .maybeSingle();

    if (error) {
      console.error('Erro ao verificar registro de ponto do dia:', error.message);
      return { error: 'Falha ao verificar registros existentes.' };
    }

    // Retorna o ID do registro de ponto se encontrado, ou null se não existir
    return { data: data?.id_work_log || null };
  } catch (err) {
    console.error('Erro inesperado no getTodayWorklogModel:', err.message);
    return { error: 'Erro interno ao verificar registros do dia.' };
  }
};

export default getTodayWorklogModel;