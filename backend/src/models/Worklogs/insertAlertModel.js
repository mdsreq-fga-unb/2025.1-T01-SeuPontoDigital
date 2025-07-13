import supabase from "../../config/supabase.js";

/**
 * Insere um alerta na tabela "alerts"
 * 
 * @param {Object} alert - Objeto contendo os campos necessários para o alerta
 * @returns {Object|null} - Retorna o resultado ou null em caso de erro
 */
export default async function insertAlertModel(alert) {
  try {
    const { data, error } = await supabase
      .from("alerts")
      .insert(alert)
      .select()
      .single();

    if (error) {
      console.error("❌ Erro ao inserir alerta no banco:", {
        mensagem: error.message,
        detalhes: error.details,
        dados: alert
      });
      return null;
    }

    console.log("✅ Alerta inserido com sucesso:", data);
    return data;
  } catch (err) {
    console.error("❌ Erro inesperado ao tentar inserir alerta:", {
      mensagem: err.message,
      stack: err.stack,
      dados: alert
    });
    return null;
  }
}

// console.log("insertAlertModel", insertAlertModel({
//   id_work_logs: 'fbe1e067-1295-416b-b8d2-29fdfd6363d5',
//   alert_type: 'atraso',
//   register_type: 'entrada',
//   scheduled_time: '11:00:00',
//   actual_time: '13:00:00',
//   note: 'Registro fora do horário previsto',
//   created_at: '2025-07-13T15:59:03.555Z'
// }))

