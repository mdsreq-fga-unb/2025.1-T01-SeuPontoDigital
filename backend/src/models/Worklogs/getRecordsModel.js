import supabase from "../../config/supabase.js";
import calcRegistroInfo from "./CalcRegisterInfo.js";
import getWorklogs from "./getWorklogs.js";

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
      // console.log("cheguei")
      const registros = await getWorklogs(empregadoData.id, inicio, fim);
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
      const registros = await getWorklogs(id_employee, inicio, fim);
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
    console.error("Tipo do erro:", typeof err);              // geralmente 'object'
    console.error("Instância:", err instanceof Error);       // geralmente true
    console.error("Mensagem:", err.message);                 // se for Error
    console.error("Stack:", err.stack);                      // rastreamento
    console.error("Objeto completo:", JSON.stringify(err));  // para erros customizados
    return { error: "Erro interno ao processar registros." };
  }
};




export default getRecordsModel;
