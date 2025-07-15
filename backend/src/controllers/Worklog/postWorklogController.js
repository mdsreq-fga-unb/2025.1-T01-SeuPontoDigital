import getTodayWorklogModel from '../../models/Worklogs/getTodayWorklogModel.js';
import postWorklogModel from '../../models/Worklogs/postWorklogModel.js';
//funções de alertas
import checkAndGenerateLateAlert from '../../middlewares/checkAndGenerateLateAlert.js';
import getScheduledTime from '../../middlewares/getScheduledTime.js';
import getWorkLogId from '../../middlewares/getWorkLogId.js';
import insertAlertModel from '../../models/Worklogs/insertAlertModel.js'

const postWorklogController = async (req, res) => {
  console.log('Debug - postWorklogController called');
  console.log('Debug - Request method:', req.method);
  console.log('Debug - Request body:', req.body);
  console.log('Debug - Request headers:', req.headers);
  console.log('Debug - req.id:', req.id);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido.' });
  }

  const employeeId = req.id;
  const { contractId, clock_in, latitude, longitude, type } = req.body;
  const registerType = type;
  console.log("registerType", type);

  console.log('Debug - Extracted data:', {
    employeeId,
    contractId,
    clock_in,
    latitude,
    longitude
  });

  if (!clock_in || !employeeId || !contractId) {
    console.log('Debug - Missing required fields:', {
      hasClockIn: !!clock_in,
      hasEmployeeId: !!employeeId,
      hasContractId: !!contractId
    });
    return res.status(400).json({ message: 'Dados incompletos para registrar a entrada.' });
  }

  try {
    console.log('Debug - Calling getTodayWorklogModel');
    const { data: existingWorkLogId, error: getError } = await getTodayWorklogModel(employeeId, contractId);

    console.log('Debug - getTodayWorklogModel result:', {
      existingWorkLogId,
      getError
    });

    if (getError) {
      console.error('Debug - Error from getTodayWorklogModel:', getError);
      return res.status(500).json({ message: getError });
    }

    if (existingWorkLogId) {
      console.log('Debug - Entry already exists for today');
      return res.status(409).json({ message: 'Ponto de entrada já foi registrado hoje para este contrato.' });
    }

    const worklogData = {
      date: new Date().toISOString().split('T')[0],
      clock_in,
      employeeId,
      contractId
    };

    console.log('Debug - Calling postWorklogModel with data:', worklogData);
    const { data: newWorkLogData, error: error } = await postWorklogModel(worklogData);
    
    console.log('Debug - postWorklogModel result:', {
      newWorkLogData,
      error
    });

    if (error) {
      console.error('Debug - Error from postWorklogModel:', error);
      return res.status(500).json({ message: error });
    }

    // Buscar horário previsto
    const scheduledTime = await getScheduledTime(contractId, registerType);
    const workLogId = await getWorkLogId(contractId, registerType, clock_in);

    if (!scheduledTime || !workLogId) {
      console.warn("Dados insuficientes para gerar alerta.");
      return res.status(200).json({ message: "Registro salvo sem alerta." });
    }

    if (!scheduledTime) {
      console.log('Sem horário previsto — não gera alerta (hora extra)');
    } else {
      const alert = checkAndGenerateLateAlert({
        scheduledTime,
        actualTime: clock_in,
        registerType,
        workLogId,
      });

    if (alert) {
      await insertAlertModel(alert);
    }
  }

    console.log('Debug - Success! Returning response');
    return res.status(201).json({ message: 'Entrada registrada com sucesso!', id: newWorkLogData.id });
  } catch (err) {
    console.error('Debug - Unexpected error in postWorklogController:', err);
    console.error('Debug - Error stack:', err.stack);
    return res.status(500).json({ message: 'Erro interno do servidor ao registrar entrada.' });
  }
};

export default postWorklogController;