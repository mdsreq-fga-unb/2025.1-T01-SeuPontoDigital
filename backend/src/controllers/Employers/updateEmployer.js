import validateCPF from "../../middlewares/validateCPF.js";
import updateEmployerByID from "../../models/Employers/updateEmployerByID.js";

const updateEmployer = async (req, res) =>{
    try{
        const {id} = req.params;
        const updateDataEmployer = req.body;

        if(updateDataEmployer.cpf && !validateCPF(updateDataEmployer.cpf)) 
            return res.status(400).json({message: "invalid cpf"});
        
        const error = await updateEmployerByID(id, updateDataEmployer);
        if (error) {
            return res.status(500).json({message: error.message});
        }
        return res.status(200).json({message: "updated employer"});
    }
    catch(err){
        console.error("error in updateEmployer controller:", err);
        throw err;
    }
}

export default updateEmployer;