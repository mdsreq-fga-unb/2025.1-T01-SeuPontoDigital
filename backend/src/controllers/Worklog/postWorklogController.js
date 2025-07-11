import getTodayWorklogModel from '../../models/Worklogs/getTodayWorklogModel.js';
import postWorklogModel from '../../models/Worklogs/postWorklogModel.js';

const postWorklogController = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido.' });
  }

  const employeeId = req.id;
  const { contractId, clock_in } = req.body;

  if (!clock_in || !employeeId || !contractId) {
    return res.status(400).json({ message: 'Dados incompletos para registrar a entrada.' });
  }

  try {
    const { data: existingWorkLogId, error: getError } = await getTodayWorklogModel(employeeId, contractId);

    if (getError) {
      return res.status(500).json({ message: getError });
    }

    if (existingWorkLogId) {
      return res.status(409).json({ message: 'Ponto de entrada já foi registrado hoje para este contrato.' });
    }

    const worklogData = {
      date: new Date().toISOString().split('T')[0],
      clock_in,
      employeeId,
      contractId
    };

    const { data: newWorkLogData, error: error } = await postWorklogModel(worklogData);
    if (error) {
      return res.status(500).json({ message: error });
    }

    return res.status(201).json({ message: 'Entrada registrada com sucesso!', id: newWorkLogData.id });
  } catch (err) {
    console.error('Erro inesperado no clockInController:', err.message);
    return res.status(500).json({ message: 'Erro interno do servidor ao registrar entrada.' });
  }
};

export default postWorklogController;