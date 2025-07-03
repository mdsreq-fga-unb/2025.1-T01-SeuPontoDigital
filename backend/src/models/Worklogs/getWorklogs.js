import supabase from "../../config/supabase.js";
import calcRegistroInfo from "./CalcRegisterInfo.js";

export default async function getWorklogs(id_employee, inicio, fim) {
  console.log("Começando getWorklogs");

  try {
    // 1. Buscar todos os registros de ponto com o contrato vinculado
    const { data: registros, error } = await supabase
      .from("register_work_logs")
      .select(`
        id_work_log,
        id_contract,
        work_logs (
          date,
          clock_in,
          clock_out,
          break_start,
          break_end
        )
      `)
      .eq("id_employee", id_employee);

    if (error || !Array.isArray(registros)) {
      console.error("Erro ao buscar registros:", error);
      return {};
    }

    // Filtro por data
    const filtrados = (inicio && fim)
      ? registros.filter(r => {
          const data = r.work_logs?.date;
          return data && data >= inicio && data <= fim;
        })
      : registros;

    const agrupados = {};

    for (const r of filtrados) {
      try {
        const { id_contract, work_logs, id_work_log } = r;
        if (!work_logs) continue;

        const { date, clock_in, break_start, break_end, clock_out } = work_logs;

        console.log("data:", date);

        // 2. Buscar CPF do empregador com base no contrato deste work_log
        const { data: contratoData, error: contratoError } = await supabase
          .from("sign_contract")
          .select("employers (cpf)")
          .eq("id_contract", id_contract)
          .maybeSingle();

        if (contratoError) {
          console.warn(`Erro ao buscar contrato ${id_contract}:`, contratoError);
        }

        const cpf_empregador = contratoData?.employers?.cpf ?? "desconhecido";

        const diaSemana = new Date(date).toLocaleDateString("pt-BR", {
          weekday: "long"
        });

        const chaveMes = date.slice(0, 7); // "YYYY-MM"

        if (!agrupados[chaveMes]) agrupados[chaveMes] = [];

        const registroBase = {
          data: date,
          dia_semana: diaSemana,
          entrada: clock_in,
          saida: clock_out,
          ida_almoco: break_start,
          volta_almoco: break_end
        };

        agrupados[chaveMes].push(registroBase);

        const index = agrupados[chaveMes].length - 1;

        agrupados[chaveMes][index] = {
          ...agrupados[chaveMes][index],
          ...(await calcRegistroInfo(id_contract, date, id_work_log)),
          cpf_empregador
        };
      } catch (err) {
        console.error("Erro ao processar registro individual:", err?.message || err);
      }
    }

    console.log("Terminando getWorklogs");
    return agrupados;
  } catch (err) {
    console.error("Erro geral no getWorklogs:", err?.message || err);
    return {};
  }
}
