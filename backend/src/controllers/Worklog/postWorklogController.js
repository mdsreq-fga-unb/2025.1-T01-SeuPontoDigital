import getTodayWorklogModel from '../../models/Worklogs/getTodayWorklogModel.js';
import postWorklogModel from '../../models/Worklogs/postWorklogModel.js';

const postWorklogController = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido.' });
  }

  const data = req.body;

  if (!data.date || !data.clock_in || !data.employeeId || !data.contractId) {
    return res.status(400).json({ message: 'Dados incompletos para registrar a entrada.' });
  }

  try {
    const { data: existingWorkLogId, error: getError } = await getTodayWorklogModel(data.employeeId, data.date);

    if (getError) {
      return res.status(500).json({ message: getError });
    }

    if (existingWorkLogId) {
      return res.status(409).json({ message: 'Ponto de entrada já foi registrado hoje.' });
    }

    const error = await postWorklogModel(data);
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