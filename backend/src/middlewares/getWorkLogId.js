import supabase from "../config/supabase.js";

/**
 * Retorna o ID do work_log do dia com base no contrato e tipo de registro.
 * Ex: para 'entrada', retorna o work_log do dia com clock_in preenchido.
 *
 * @param {string} contractId - ID do contrato
 * @param {string} registerType - 'entrada', 'saida', 'entrada_intervalo', 'saida_intervalo'
 * @returns {string|null}
 */
export default async function getWorkLogId(contractId, registerType) {
  try {
    const fieldMap = {
      entrada: 'clock_in',
      break_start: 'break_start',
      break_end: 'break_end',
      clock_out: 'clock_out',
    };

    const normalizedType = registerType.toLowerCase();
    const column = fieldMap[normalizedType];

    if (!column) {
      console.warn(`⚠️ Tipo de registro inválido: '${registerType}'`);
      return null;
    }

    const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

    const { data, error } = await supabase
      .from("register_work_logs")
      .select(`id_work_log, work_logs(date, ${column})`)
      .eq("id_contract", contractId);

    if (error) {
      console.error("❌ Erro ao buscar registros de ponto:", {
        mensagem: error.message,
        detalhes: error.details,
        contractId,
        registerType,
        column,
      });
      return null;
    }

    for (const row of data) {
      const log = row.work_logs;
      if (log && log.date === today && log[column] !== null) {
        return row.id_work_log;
      }
    }

    console.warn(`⚠️ Nenhum work_log encontrado hoje com ${column} preenchido`);
    return null;

  } catch (err) {
    console.error("❌ Erro inesperado ao obter ID de work_log:", {
      mensagem: err.message,
      stack: err.stack,
      contractId,
      registerType,
    });
    return null;
  }
}


// console.log('getWorklog', await getWorkLogId('e2149e35-eccc-49df-801a-a373fc4577d9', 'break_out'))