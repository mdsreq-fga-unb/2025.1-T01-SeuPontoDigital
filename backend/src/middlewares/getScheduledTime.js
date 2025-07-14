import supabase from "../config/supabase.js";

/**
 * Retorna o horário previsto (start/end ou intervalo) do contrato baseado no dia e tipo de registro.
 *
 * @param {string} contractId - ID do contrato
 * @param {string} registerType - 'entrada' | 'break_start' | 'break_end' | 'clock_out'
 * @returns {string|null} - Horário previsto (ex: "08:00:00") ou null
 */
export default async function getScheduledTime(contractId, registerType) {
  try {
    const day = new Date().toLocaleDateString("en-US", { weekday: 'long' }).toLowerCase(); // ex: 'monday'

    if (registerType === 'entrada') {
      const column = `${day}_start`;
      const { data, error } = await supabase
        .from("work_schedules")
        .select(column)
        .eq("id_contract", contractId)
        .maybeSingle();

      if (error || !data || !data[column]) {
        console.warn("Horário de entrada não encontrado:", { contractId, column });
        return null;
      }

      return data[column];
    }

    if (registerType === 'clock_out') {
      const column = `${day}_end`;
      const { data, error } = await supabase
        .from("work_schedules")
        .select(column)
        .eq("id_contract", contractId)
        .maybeSingle();

      if (error || !data || !data[column]) {
        console.warn("Horário de saída não encontrado:", { contractId, column });
        return null;
      }

      return data[column];
    }

    if (registerType !== 'break_start' && registerType !== 'break_end') {
      console.warn("Tipo de registro não é intervalo:", registerType);
      return null;
    }

    // 1. Verifica se tem flex_break
    const { data: flexData, error: flexError } = await supabase
      .from("flex_breaks")
      .select("duration_minutes")
      .eq("id_contract", contractId)
      .maybeSingle();

    if (flexError) {
      console.warn("Erro ao buscar flex_breaks:", flexError.message);
      return null;
    }

    if (flexData) {
      const durationLimit = flexData.duration_minutes;

      if (registerType === 'break_start') {
        return null; // flexível não exige verificação na ida
      }

      // Para break_end: buscar registro de hoje
      const today = new Date().toISOString().split("T")[0];

      const { data: breakData, error: breakError } = await supabase
        .from("register_work_logs")
        .select("work_logs(break_start, break_end, date)")
        .eq("id_contract", contractId)
        .not("work_logs", "is", null)
        .eq("work_logs.date", today)
        // .limit(1)
        .maybeSingle();

      const breakStart = breakData.work_logs?.break_start;
      const breakEnd = breakData.work_logs?.break_end;

      if (!breakStart || !breakEnd) {
        console.warn("⚠️ Campos de intervalo ausentes:", { breakStart, breakEnd });
        return null;
      }

      const [h1, m1] = breakStart.split(":").map(Number);
      const [h2, m2] = breakEnd.split(":").map(Number);
      const start = h1 * 60 + m1;
      const end = h2 * 60 + m2;
      const realDuration = end - start;

      if (realDuration > durationLimit) {
        const hours = Math.floor(durationLimit / 60).toString().padStart(2, '0');
        const minutes = (durationLimit % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:00`; // formato HH:MM:SS
      } else {
        return null; // dentro do limite, sem alerta
      }
    }

    // 2. Verifica se tem fixed_break
    const { data: fixedData, error: fixedError } = await supabase
      .from("fixed_breaks")
      .select("break_start, break_end")
      .eq("id_contract", contractId)
      .maybeSingle();

    if (fixedError) {
      console.warn("Erro ao buscar fixed_breaks:", fixedError.message);
      return null;
    }

    if (fixedData) {
      return registerType === 'break_start' ? fixedData.break_start : fixedData.break_end;
    }

    console.warn("Tipo de registro inválido:", registerType);
    return null;

  } catch (err) {
    console.error("❌ Erro inesperado em getScheduledTime:", {
      mensagem: err.message,
      stack: err.stack,
      contractId,
      registerType
    });
    return null;
  }
}

console.log('getScheduledTime', getScheduledTime('e2149e35-eccc-49df-801a-a373fc4577d9', 'break_end'))