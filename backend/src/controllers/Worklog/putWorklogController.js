import getTodayWorklogModel from '../../models/Worklogs/getTodayWorklogModel.js';
import putWorklogModel from '../../models/Worklogs/putWorklogModel.js';

const putWorklogController = async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Método não permitido.' });
  }

  const employeeId = req.id;
  const { contractId, ...updatePayload } = req.body;

  if (!employeeId || !contractId) {
    return res.status(400).json({ message: 'Dados incompletos para registrar a entrada.' });
  }

  try {
    const { data: existingWorkLogId, error: getError } = await getTodayWorklogModel(employeeId, contractId);

    if (getError) {
      return res.status(500).json({ message: getError });
    }

    if (!existingWorkLogId) {
      return res.status(404).json({ message: 'Nenhum registro de entrada encontrado para hoje.' });
    }

    delete updatePayload.contractId;

    if (Object.keys(updatePayload).length === 0) {
      return res.status(400).json({ message: 'Nenhum dado de atualização fornecido.' });
    }

    const { error: updateError } = await putWorklogModel(existingWorkLogId, updatePayload);

    if (updateError) {
      return res.status(500).json({ message: updateError });
    }

    return res.status(200).json({ message: 'Registro de ponto atualizado com sucesso!' });
  } catch (err) {
    console.error('Erro inesperado no putWorkLogController:', err.message);
    return res.status(500).json({ message: 'Erro interno do servidor ao atualizar registro de ponto.' });
  }
};

export default putWorklogController;