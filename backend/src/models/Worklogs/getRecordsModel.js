import supabase from "../../config/supabase.js";

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

// Função auxiliar para buscar e calcular registros de ponto de um empregado
async function buscarRegistrosDeEmpregado(id_employee, inicio, fim) {
  const cargaHorariaDia = 8;
  const intervaloMinutosContrato = 60;

  let { data: registros, error } = await supabase
    .from("work_logs")
    .select("*")
    .eq("id", id_employee);

  if (inicio && fim) {
    registros = registros.filter((r) => r.date >= inicio && r.date <= fim);
  }

  if (error || !registros) return [];

  return registros.map((registro) => {
    const { date, clock_in, break_start, break_end, clock_out } = registro;

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

    return {
      data: date,
      dia_semana: diaSemana,
      entrada: clock_in,
      saida: clock_out,
      ida_almoco: break_start,
      volta_almoco: break_end,
      intervalo_contrato: intervaloMinutosContrato,
      carga_horaria_dia: cargaHorariaDia,
      horas_trabalhadas: horasTrabalhadas.toFixed(2),
      horas_extra: horaExtra > 0 ? horaExtra.toFixed(2) : "0.00"
    };
  });
}

export default getRecordsModel;
