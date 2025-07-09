import getEmployeeAndContractsModel from '../../models/ContractEmployee/getEmployeeAndContractsModel.js';

const getEmployeeAndContractsController = async (req, res) => {
    console.log("Cheguei")
    const employeeId = req.id;

    if (!employeeId) {
        return res.status(400).json({ message: "ID do funcionário não fornecido pelo token de autenticação." });
    }

    try {
        const { data, error, message } = await getEmployeeAndContractsModel(employeeId);

        if (error) {
            return res.status(500).json({ message: error });
        }

        if (!data) {
            return res.status(404).json({ message: message || "Funcionário ou contratos não encontrados para o ID fornecido." });
        }

        return res.status(200).json(data);

    } catch (err) {
        console.error("Erro inesperado em getEmployeeAndContractsController:", err);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

export default getEmployeeAndContractsController;