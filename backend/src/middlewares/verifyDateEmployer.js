import getOneEmployerModel from "../models/Employers/getOneEmployerModel.js";

const verifyDateEmployer = async (req, res, next) => {
    try {
        const employerID = req.params.id;
        const employer = await getOneEmployerModel(employerID);

        if (!employer) {
            return res.status(404).send({ message: "Employer not found" });
        }
        
        const dateCreatedEmployer = new Date(employer.created_at);
        const dateNow = new Date();
        const twoYearsInMilliseconds = 2 * 365 * 24 * 60 * 60 * 1000;

        if ((dateNow.getTime() - dateCreatedEmployer.getTime()) > twoYearsInMilliseconds) {
            req.id = employerID
            next(); 
        } 
        else {
            return res.status(403).send({ message: "created less than 2 years ago" });
        }
    } catch (error) {
        return res.status(500).send({ message: "internal server error"});
    }
   
}

export default verifyDateEmployer;