import isLate from "./isLate.js"

/**
 * Gera um alerta se o horário estiver atrasado.
 * 
 * @param {Object} params
 * @param {string} params.scheduledTime - Hora prevista ("HH:mm")
 * @param {string} params.actualTime - Hora real ("HH:mm")
 * @param {string} params.registerType - 'entrada', 'saida', etc.
 * @param {string} params.workLogId - ID do registro de ponto
 * @returns {Object|null} - Objeto de alerta ou null se não estiver atrasado
 */
export default function checkAndGenerateLateAlert({ scheduledTime, actualTime, registerType, workLogId }) {
  if (isLate(scheduledTime, actualTime)) {
    return {
      id_work_logs: workLogId,
      alert_type: 'atraso',
      register_type: registerType,
      scheduled_time: scheduledTime,
      actual_time: actualTime,
      note: 'Registro fora do horário previsto',
      created_at: new Date().toISOString()
    };
  }
  return null;
}

// console.log('checkAndGenerateLateAlert()', checkAndGenerateLateAlert({ scheduledTime: "11:00:00", actualTime: "12:00:00", registerType: "entrada", workLogId:"fbe1e067-1295-416b-b8d2-29fdfd6363d5" }))