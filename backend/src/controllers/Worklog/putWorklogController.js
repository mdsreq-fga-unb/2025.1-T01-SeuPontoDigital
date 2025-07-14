import getTodayWorklogModel from '../../models/Worklogs/getTodayWorklogModel.js';
import putWorklogModel from '../../models/Worklogs/putWorklogModel.js';
//funções de alertas
import checkAndGenerateLateAlert from '../../middlewares/checkAndGenerateLateAlert.js';
import getScheduledTime from '../../middlewares/getScheduledTime.js';
import getWorkLogId from '../../middlewares/getWorkLogId.js';
import insertAlertModel from '../../models/Worklogs/insertAlertModel.js'

const putWorklogController = async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Método não permitido.' });
  }

  const employeeId = req.id;
  const { contractId, latitude, longitude, ...updatePayload } = req.body;

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

    // Filter out fields that don't exist in work_logs table
    const validFields = ['clock_out', 'break_start', 'break_end'];
    const filteredPayload = {};

    let actualTime = null;
    let registerType = null;
    
    for (const [key, value] of Object.entries(updatePayload)) {
      if (validFields.includes(key)) {
        filteredPayload[key] = value;
        actualTime = value;
        if (key === 'clock_out') registerType = 'clock_out';
        if (key === 'break_start') registerType = 'break_start';
        if (key === 'break_end') registerType = 'break_end';
      }
    }

    if (Object.keys(filteredPayload).length === 0) {
      return res.status(400).json({ message: 'Nenhum dado de atualização fornecido.' });
    }

    const { error: updateError } = await putWorklogModel(existingWorkLogId, filteredPayload);

    if (updateError) {
      return res.status(500).json({ message: updateError });
    }

     //  Gerar alerta se necessário
    const scheduledTime = await getScheduledTime(contractId, registerType);
    const workLogId = await getWorkLogId(contractId, registerType);

    if (!scheduledTime || !workLogId) {
      return res.status(200).json({
        message: "Registro salvo sem alerta (horário previsto ausente (horas extras) ou work_log não localizado).",
        id: workLogId 
      });
    }

    try {
      const alert = checkAndGenerateLateAlert({
        scheduledTime,
        actualTime,
        registerType,
        workLogId,
      });

      if (alert) {
        await insertAlertModel(alert);
      }

      return res.status(201).json({ message: 'Entrada registrada com sucesso!', id: workLogId });

  } catch (alertError) {
    console.error('Erro ao gerar/inserir alerta:', alertError);
    return res.status(201).json({
      message: 'Entrada registrada, mas o alerta falhou.',
      id: workLogId 
    });
  }

    // return res.status(200).json({ message: 'Registro de ponto atualizado com sucesso!' });
  } catch (err) {
    console.error('Erro inesperado no putWorkLogController:', err.message);
    return res.status(500).json({ message: 'Erro interno do servidor ao atualizar registro de ponto.' });
  }
};

export default putWorklogController;