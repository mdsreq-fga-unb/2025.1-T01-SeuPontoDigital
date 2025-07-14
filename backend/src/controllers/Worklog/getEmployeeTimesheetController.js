import getRecordsModel from "../../models/Worklogs/getRecordsModel.js";
import getAllSignContractModel from "../../models/SignContract/getAllSignContractModel.js";
// import getContractByEmployeeAndEmployer from "../../models/contracts/getContractByEmployeeAndEmployer.js";
// import getOneEmployeeModel from "../../models/Employees/getOneEmployeeModel.js";

const getEmployeeTimesheetController = async (req, res) => {
  try {
    const { employeeId, employerId, period } = req.query;

    if (!employeeId || !employerId || !period) {
      return res.status(400).send({ message: "Parâmetros faltando." });
    }

    const [ano, mes] = period.split("-").map(Number);
    const inicio = new Date(ano, mes - 1, 25);
    const fim = new Date(ano, mes, 24);

    // Consertar esta parte
    const contract = await getAllSignContractModel();

    if (!contract) {
      return res.status(404).send({ message: "Contrato não encontrado." });
    }

    const contratoEncontrado = contract.find(
        (entry) =>
            entry.employee.id === employeeId &&
            entry.employer.id === employerId
    );

    if (!contratoEncontrado) {
    return res.status(404).send({ message: "Contrato não encontrado." });
    }

    const contractId = contratoEncontrado.contract.id;
    // console.log("contractId", contractId)
    

    const employId = `${employeeId}`;

    const registros = await getRecordsModel({
      employId,
      inicio,
      fim,
      contractId
    });

    return res.status(200).json(registros.data);
  } catch (err) {
    console.error("Erro em getEmployeeTimesheetController:", err);
    return res.status(500).send({ message: "Erro interno ao buscar timesheet." });
  }
};

export default getEmployeeTimesheetController;
