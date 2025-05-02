import insertEmployee from "../../models/Employees/insertEmployee.js";
import validateCPF from "../../middlewares/validateCPF.js";

const postEmployee = async (req, res) => {
    try{
        const employee = req.body;
    if(validateCPF(employee.cpf)){
        const error = await insertEmployee(employee);
        if (error){
            return res.status(400).json({message: error.message});
        }
        return res.status(201).json({message: "inserted employee"});
    }
    return res.status(400).json({message: "invalid cpf"})
    }
    catch(err){
        console.error("error in postEmployee controller:", err);
        throw err;
    }
}

export default postEmployee;