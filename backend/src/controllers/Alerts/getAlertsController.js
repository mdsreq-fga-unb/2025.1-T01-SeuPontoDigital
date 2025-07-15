import getAlertsModel from "../../models/Alerts/getAlertsModel.js";

const getAlertsController = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: "Método não permitido." });
  }

  const employerId = req.id; // vindo do middleware de autenticação
  const contractId = req.query.contractId || req.params.contractId;
  // const employerId = req.query.employId || req.params.employId;

  if (!contractId || !employerId) {
    return res.status(400).json({ message: "Faltam parâmetros obrigatórios." });
  }

  try {
    const { count, error } = await getAlertsModel(contractId, employerId);

    if (error) {
      console.error("Erro ao buscar alertas:", error);
      return res.status(500).json({ message: "Erro ao buscar alertas." });
    }

    return res.status(200).json({
      contractId,
      totalAlerts: count
    });

  } catch (err) {
    console.error("Erro inesperado em getAlertsController:", err);
    return res.status(500).json({ message: "Erro interno ao buscar alertas." });
  }
};

export default getAlertsController;
