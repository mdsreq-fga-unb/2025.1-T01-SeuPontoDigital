import getRecordsModel from "../../models/Worklogs/getRecordsModel.js"

const getRecordsController = async (req, res) => {
  const { inicio, fim } = req.query;

  let filtros = {};

  if (inicio && fim) {
    filtros.data = {
      $gte: new Date(inicio),
      $lte: new Date(fim)
    };
  }

  const registros = await db('worklogs') // ou qualquer ORM
    .whereBetween('data', [filtros.data.$gte, filtros.data.$lte]);

  res.json(registros);
};

export default getRecordsController;