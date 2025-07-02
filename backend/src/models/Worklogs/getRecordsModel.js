import supabase from "../../config/supabase.js";
import calcRegistroInfo from "./CalcRegisterInfo.js";

const getRecordsModel = async ({ cpf, inicio, fim }) => {
  try {
    // 1. Verificar se é um empregado
    const { data: empregadoData } = await supabase
      .from("employees")
      .select("id, name")
      .eq("cpf", cpf)
      .maybeSingle();

    if (empregadoData) {
      //  É um empregado: buscar os próprios registros
      const registros = await buscarRegistrosDeEmpregado(empregadoData.id, inicio, fim);
      return {
        data: [
          {
            empregado: {
              id: empregadoData.id,
              nome: empregadoData.name
            },
            registros
          }
        ]
      };
    }

    // 2. Se não for empregado, verificar se é empregador
    const { data: empregadorData, error: empregadorError } = await supabase
      .from("employers")
      .select("id")
      .eq("cpf", cpf)
      .maybeSingle();

    if (!empregadorData || empregadorError) {
      return { error: "CPF não corresponde a um empregado nem a um empregador." };
    }

    const id_employer = empregadorData.id;

    // 3. Buscar todos os empregados vinculados ao empregador
    const { data: empregadosData, error: empregadosError } = await supabase
      .from("employ")
      .select("id_employee, employees(name)")
      .eq("id_employer", id_employer);

    if (empregadosError) return { error: "Erro ao buscar empregados do empregador." };

    const resultados = [];

    for (const { id_employee, employees } of empregadosData) {
      const registros = await buscarRegistrosDeEmpregado(id_employee, inicio, fim);
      resultados.push({
        empregado: {
          id: id_employee,
          nome: employees.name
        },
        registros
      });
    }

    return { data: resultados };
  } catch (err) {
    console.error("Erro interno no getRecordsModel:", err);
    return { error: "Erro interno ao processar registros." };
  }
};

async function buscarRegistrosDeEmpregado(id_employee, inicio, fim) {
  const cargaHorariaDia = 8;
  const intervaloMinutosContrato = 60;

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
    const { id_contract, work_logs } = r;
    if (!work_logs) continue;

    const { date, clock_in, break_start, break_end, clock_out } = work_logs;

    // 2. Buscar CPF do empregador com base no contrato deste work_log
    const { data: contratoData, error: contratoError } = await supabase
      .from("sign_contract")
      .select("employers (cpf)")
      .eq("id_contract", id_contract)
      .maybeSingle();

    const cpf_empregador = contratoData?.employers?.cpf ?? "desconhecido";

    if (contratoError) {
      console.warn(`Erro ao buscar contrato ${id_contract}:`, contratoError);
    }

    const entrada = new Date(`${date}T${clock_in}`);
    const saida = new Date(`${date}T${clock_out}`);
    const idaAlmoco = new Date(`${date}T${break_start}`);
    const voltaAlmoco = new Date(`${date}T${break_end}`);

    const horasTrabalhadas =
      (saida - entrada - (voltaAlmoco - idaAlmoco)) / (1000 * 60 * 60);
    const horaExtra = horasTrabalhadas - cargaHorariaDia;

    const diaSemana = new Date(date).toLocaleDateString("pt-BR", {
      weekday: "long"
    });

    const chaveMes = date.slice(0, 7); // "YYYY-MM"

    if (!agrupados[chaveMes]) agrupados[chaveMes] = [];

      //   agrupados[chaveMes].push({
      //   data: date,
      //   dia_semana: diaSemana,
      //   entrada: clock_in,
      //   saida: clock_out,
      //   ida_almoco: break_start,
      //   volta_almoco: break_end,
      //   intervalo_contrato: intervaloMinutosContrato,
      //   carga_horaria_dia: cargaHorariaDia,
      //   horas_trabalhadas: horasTrabalhadas.toFixed(2),
      //   horas_extra: horaExtra > 0 ? horaExtra.toFixed(2) : "0.00",
      //   cpf_empregador
      // });

      // agrupados[chaveMes].push({
      //   data: date,
      //   dia_semana: diaSemana,
      //   entrada: clock_in,
      //   saida: clock_out,
      //   ida_almoco: break_start,
      //   volta_almoco: break_end
      //   // intervalo_contrato: intervaloMinutosContrato,
      //   // carga_horaria_dia: cargaHorariaDia,
      //   // horas_trabalhadas: horasTrabalhadas.toFixed(2),
      //   // horas_extra: horaExtra > 0 ? horaExtra.toFixed(2) : "0.00",
        
      // });

    const registroBase = {
      data: date,
      dia_semana: diaSemana,
      entrada: clock_in,
      saida: clock_out,
      ida_almoco: break_start,
      volta_almoco: break_end
    };

    // 2. Adiciona o registro base
    agrupados[chaveMes].push(registroBase);

    // 3. Adiciona os campos calculados depois
    const index = agrupados[chaveMes].length - 1;
    agrupados[chaveMes][index] = {
      ...agrupados[chaveMes][index],
      ...calcRegistroInfo({
          date,
          diaSemana,
          clock_in,
          clock_out,
          break_start,
          break_end,
          intervaloMinutosContrato,
          cargaHorariaDia,
          cpf_empregador
        }),
      cpf_empregador
    };

    // agrupados[chaveMes].push(
    //     calcRegistroInfo({
    //       date,
    //       diaSemana,
    //       clock_in,
    //       clock_out,
    //       break_start,
    //       break_end,
    //       intervaloMinutosContrato,
    //       cargaHorariaDia,
    //       cpf_empregador
    //     })
    //   );
    // }
  }
return agrupados;
}



export default getRecordsModel;
