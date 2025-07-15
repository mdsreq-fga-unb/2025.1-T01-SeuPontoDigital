import supabase from "../../config/supabase.js";

export default async function getAlertsModel(contractId, employerId) {
  try {
    // Buscar o employeeId a partir do employerId e contractId
    const { data: contractData, error: contractError } = await supabase
      .from("sign_contract")
      .select("id_employee")
      .eq("id_employer", employerId)
      .eq("id_contract", contractId)
      .single();

    if (contractError || !contractData) {
  throw new Error("Erro ao buscar o contrato ou vínculo não encontrado");
  }

  const employeeId = contractData.id_employee;


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
