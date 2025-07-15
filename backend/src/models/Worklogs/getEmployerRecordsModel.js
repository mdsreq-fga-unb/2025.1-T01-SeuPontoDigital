import supabase from "../../config/supabase.js";
import calcRegistroInfo from "./CalcRegisterInfo.js";
import getEmployerWorklogs from "./getEmployerWorklogs.js";
import getContractDetails from "./work_schedule.js";

const getEmployerRecordsModel = async ({ employId, inicio, fim }) => {
  try {

    const { data: empregadorData, error: empregadorError } = await supabase
      .from("employers")
      .select("id")
      .eq("id", employId)
      .maybeSingle();

    if (!empregadorData || empregadorError) {
      return { error: "ID não corresponde a um empregado nem a um empregador." };
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
      // Consulta complementar: buscar o contrato entre esse empregado e o empregador atual
      const { data: contratoData, error: contratoError } = await supabase
        .from("sign_contract")
        .select("id_contract")
        .eq("id_employee", id_employee)
        .eq("id_employer", id_employer)
        .maybeSingle();

      if (contratoError || !contratoData) {
        console.warn(`Contrato não encontrado para empregado ${id_employee}`);
        continue; // Pula para o próximo empregado
      }

      const id_contract_input = contratoData.id_contract;

      let detalhesContrato = {};
      if (id_contract_input && id_employee) {
        detalhesContrato = await getContractDetails({
          id_employee: id_employee,
          id_contract: id_contract_input,
          id_employer: ''
        });
      }

      const registros = await getEmployerWorklogs(id_employee, inicio, fim, id_contract_input);
      resultados.push({
        empregado: {
          id: id_employee,
          nome: employees.name, //adicionarei novos dados aqui
          ...detalhesContrato
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

export default getEmployerRecordsModel;
