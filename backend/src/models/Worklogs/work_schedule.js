import supabase from "../../config/supabase.js";

export default async function getContractDetails({ id_employee, id_contract }) {
  try {
    if (!id_employee || !id_contract) {
      throw new Error("Parâmetros id_employee e id_contract são obrigatórios.");
    }

    // 1. Buscar dados do contrato a partir de sign_contract + contracts
    const { data: contratoData, error: contratoError } = await supabase
      .from("sign_contract")
      .select("contracts(start_date, end_date, status, salary, function)")
      .eq("id_contract", id_contract)
      .eq("id_employee", id_employee)
      .maybeSingle();

    if (contratoError) throw contratoError;

    const dadosContrato = contratoData?.contracts ?? {};

    // 2. Buscar tipo de jornada
    const { data: scheduleData, error: scheduleError } = await supabase
      .from("work_schedules")
      .select("type")
      .eq("id_contract", id_contract)
      .maybeSingle();

    if (scheduleError) throw scheduleError;

    // 3. Buscar intervalo fixo (se houver)
    const { data: fixedBreakData, error: fixedBreakError } = await supabase
      .from("fixed_breaks")
      .select("break_start, break_end")
      .eq("id_contract", id_contract)
      .maybeSingle();

    if (fixedBreakError) throw fixedBreakError;

    // 4. Buscar intervalo flexível (se houver)
    const { data: flexBreakData, error: flexBreakError } = await supabase
      .from("flex_breaks")
      .select("duration_minutes")
      .eq("id_contract", id_contract)
      .maybeSingle();

    if (flexBreakError) throw flexBreakError;

    return {
      start_date: dadosContrato?.start_date || null,
      end_date: dadosContrato?.end_date || null,
      status: dadosContrato?.status ?? null,
      salary: dadosContrato?.salary ?? null,
      function: dadosContrato?.function || null,
      type: scheduleData?.type || null,
      break_start: fixedBreakData?.break_start || null,
      break_end: fixedBreakData?.break_end || null,
      duration_minutes: flexBreakData?.duration_minutes ?? null,
    };
  } catch (err) {
    console.error("❌ Erro ao buscar detalhes do contrato:", {
      mensagem: err.message,
      parametros: { id_employee, id_contract }
    });
    return { error: "Erro ao buscar detalhes do contrato." };
  }
}
