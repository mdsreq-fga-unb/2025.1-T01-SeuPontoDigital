import getRecordsModel from "../../models/Worklogs/getRecordsModel.js";

const getRecordsController = async (req, res) => {
  const employId = req.id;
  const { inicio, fim, contractId } = req.query;

  console.log("Parâmetros recebidos na API:", {
    employId,
    inicio,
    fim,
    contractId,
    tipoContractId: typeof contractId
  });

  if (!employId) {
    return res.status(400).json({ message: "Parâmetro 'employId' é obrigatório." });
  }

  try {
    // Converter string "undefined" para valor real undefined
    const contractIdProcessado = contractId === "undefined" ? undefined : contractId;

    const { data, error } = await getRecordsModel({ 
      employId, 
      inicio, 
      fim, 
      contractId: contractIdProcessado 
    });

    if (error) {
      return res.status(500).json({ message: error });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error("Erro inesperado no getRecordsController:", err);
    return res.status(500).json({ message: "Ocorreu um erro inesperado no servidor." });
  }
};

export default getRecordsController;
