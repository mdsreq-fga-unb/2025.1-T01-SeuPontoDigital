import supabase from "../../config/supabase.js";
import calcRegistroInfo from "./CalcRegisterInfo.js";
import getWorklogs from "./getWorklogs.js";
import getContractDetails from "./work_schedule.js";

const getRecordsModel = async ({ employId, inicio, fim, contractId }) => {
  try {
    // 1. Tentar buscar o empregado com base no ID
    const { data: empregadoData, error: empregadoError } = await supabase
      .from("employees")
      .select("id, name")
      .eq("id", employId)
      .maybeSingle();

    if (empregadoError) {
      return { error: "Erro ao buscar empregado." };
    }

    if (empregadoData) {
      let detalhesContrato = {};
      if (contractId && empregadoData.id) {
        console.log("tentando!!!", empregadoData.id, contractId)
        detalhesContrato = await getContractDetails({
          id_employee: empregadoData.id,
          id_contract: contractId,
          id_employer: ''
        });
      }

      // É um empregado: buscar os próprios registros
      const registros = await getWorklogs(empregadoData.id, inicio, fim, contractId);

      // Buscar detalhes do contrato, se tiver employerId
      
      
      return {
        data: [
          {
            empregado: {
              id: empregadoData.id,
              nome: empregadoData.name,
              ...detalhesContrato
            },
            registros
          }
        ]
      };
    }

    // // 2. Caso não seja empregado, verificar se é um empregador
    // const { data: empregadorData, error: empregadorError } = await supabase
    //   .from("employers")
    //   .select("id")
    //   .eq("id", employId)
    //   .maybeSingle();

    // if (!empregadoData || empregadoError) {
    //   return { error: "ID não corresponde a um empregado nem a um empregador." };
    // }

    // const id_employer = empregadorData.id;

    // 3. Buscar todos os empregados vinculados ao empregador
    // const { data: empregadosData, error: empregadosError } = await supabase
    //   .from("employ")
    //   .select("id_employee, employees(name)")
    //   .eq("id_employer", id_employer);

    // if (empregadosError) return { error: "Erro ao buscar empregados do empregador." };

    // const resultados = [];

    // for (const { id_employee, employees } of empregadosData) {
    //   const registros = await getWorklogs(id_employee, inicio, fim);
    //   resultados.push({
    //     empregado: {
    //       id: id_employee,
    //       nome: employees.name
    //     },
    //     registros
    //   });
    // }

    // return { data: resultados };
  } catch (err) {
    console.error("❌ Erro interno no getRecordsModel:", {
    mensagem: err.message,
    stack: err.stack,
    parametros: { employId, inicio, fim, contractId }
  });

    return { error: "Erro interno ao processar registros." };
  }
};

export default getRecordsModel;
