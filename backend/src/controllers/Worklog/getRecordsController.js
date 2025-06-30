import getRecordsModel from "../../models/Worklogs/getRecordsModel.js"
import logger from "../../config/logger.js";

const getRecordsController = async (req, res) => {
  //data de início e fim são opcionais
  //preciso de receber o dado do empregado e do empregador, através do cpf dele
  //retorna um array de objetos em data
//   logger.info("oi")
//   console.log("oi2")

  const { cpf, inicio, fim } = req.query;

  try {
        const { data, error } = await getRecordsModel({cpf, inicio, fim});

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