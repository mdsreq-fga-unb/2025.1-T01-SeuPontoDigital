import deleteEmployeeByID from "../../models/Employees/deleteEmployeeByID.js";

const deleteEmployee = async (req, res) => {
    try{
        const {id} = req.params;
        const error = await deleteEmployeeByID(id);
        if (error){
            return res.status(400).json({message: error.message});
        }
        return res.status(200).json({message: "employee deleted"});
    }
    catch(err){
        console.error("error in deleteEmployee controller:", err);
        throw err;
    }
} 

export default deleteEmployee;