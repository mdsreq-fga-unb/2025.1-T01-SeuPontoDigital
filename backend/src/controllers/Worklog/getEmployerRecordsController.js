
import getEmployerRecordsModel from "../../models/Worklogs/getEmployerRecordsModel.js";

const getEmployerRecordsController = async (req, res) => {
  // data de início e fim são opcionais
  // recebendo o id do empregado via query
  const employId = req.id;
  const { inicio, fim } = req.query;


  if (!employId) {
    return res.status(400).json({ message: "Parâmetro 'employeeId' é obrigatório." });
  }

  try {
    const { data, error } = await getEmployerRecordsModel({ employId, inicio, fim });

    if (error) {
      return res.status(500).json({ message: error });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error("Erro inesperado no getRecordsController:", err);
    return res.status(500).json({ message: "Ocorreu um erro inesperado no servidor." });
  }
};

export default getEmployerRecordsController;
