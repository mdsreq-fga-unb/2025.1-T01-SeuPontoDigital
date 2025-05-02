import insertEmployer from "../../models/Employers/insertEmployer.js";
import validateCPF from "../../services/validateCPF.js";
import validateEmail from "../../services/validateEmail.js";

const postEmployer = async (req, res) => {
    try{
        const employer = req.body;
        if(validateCPF(employer.cpf)){
            const error = await insertEmployer(employer);
            if (error){
                return res.status(400).json({message: error.message});
            }
            return res.status(201).json({message: "employer inserted"});
        }
        return res.status(400).json({message: "invalid cpf"})
    }
    catch(err){
        console.error("error in postEmployer controller", err);
        throw err;
    }
}   

export default postEmployer;