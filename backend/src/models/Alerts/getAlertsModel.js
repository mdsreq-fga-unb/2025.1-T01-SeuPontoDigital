import supabase from "../../config/supabase.js";

export default async function getAlertsModel(contractId, employeeId) {
  try {
    // Primeiro, buscar todos os work_logs do funcionário para o contrato
    const { data: workLogs, error: workLogError } = await supabase
      .from("register_work_logs")
      .select("id_work_log")
      .eq("id_contract", contractId)
      .eq("id_employee", employeeId);

    if (workLogError || !workLogs || workLogs.length === 0) {
      return { count: 0 }; // nenhum registro = nenhum alerta
    }

    const workLogIds = workLogs.map(row => row.id_work_log);

    // Agora, contar quantos alertas estão associados a esses work_logs
    const { count, error } = await supabase
      .from("alerts")
      .select("id", { count: "exact", head: true })
      .in("id_work_logs", workLogIds);

    if (error) return { error };

    return { count };
  } catch (err) {
    return { error: { message: err.message, stack: err.stack } };
  }
}
