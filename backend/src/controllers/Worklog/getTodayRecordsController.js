import getTodayRecordsModel from '../../models/Worklogs/getTodayRecordsModel.js';

const getTodayRecordsController = async (req, res) => {
    const employeeId = req.id;
    
    const {id: contractId} = req.params;

    if (!contractId) {
        return res.status(400).json({ message: "O ID do contrato é obrigatório." });
    }

    try {
        const { data, error } = await getTodayRecordsModel(employeeId, contractId);

        if (error) {
            return res.status(500).json({ message: error });
        }

        return res.status(200).json(data);

    } catch (err) {
        console.error("Erro inesperado no getTodayRecordsController:", err);
        return res.status(500).json({ message: "Ocorreu um erro inesperado no servidor." });
    }
};

export default getTodayRecordsController;
