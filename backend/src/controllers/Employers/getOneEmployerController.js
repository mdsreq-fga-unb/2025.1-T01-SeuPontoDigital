import getOneEmployerModel from "../../models/Employers/getOneEmployerModel.js";
import getOneEmployerWithEmployeesModel from "../../models/Employers/getOneEmployerWithEmployeesModel.js";

const getOneEmployerController = async (req, res) => {
    try {
        const employerID = req.params.id;
        const includeContracts = req.query.includeContracts === 'true';
        
        let employer;
        
        if (includeContracts) {
            employer = await getOneEmployerWithEmployeesModel(employerID);
        } else {
            employer = await getOneEmployerModel(employerID);
        }
        
        if (!employer) {
            return res.status(404).send({ message: "employer not found" });
        }

        return res.status(200).json(employer);
    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
};

export default getOneEmployerController;