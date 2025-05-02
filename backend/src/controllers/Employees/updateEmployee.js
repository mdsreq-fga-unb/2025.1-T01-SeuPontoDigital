import validateCPF from "../../services/validateCPF.js";
import updateEmployeeByID from "../../models/Employees/updateEmployeeByID.js";

const updateEmployee = async (req, res) => {
    try{
        const {id} = req.params;
        const updateDataEmployee = req.body;

        if(updateDataEmployee.cpf && !validateCPF(updateDataEmployee.cpf)) 
            return res.status(400).json({message: "invalid cpf"});
        
        const error = await updateEmployeeByID(id, updateDataEmployee);
        if (error) {
            return res.status(500).json({message: error.message});
        }
        return res.status(200).json({message: "updated employee"});
    }
    catch(err){
        console.error("error in updateEmployee controller:", err);
        throw err;
    }
}

export default updateEmployee;