import deleteEmployeeModel from "../../models/Employees/deleteEmployeeModel.js";
import findAdminByEmail from "../../models/Admin/findAdminByEmail.js";
import validateHashPasswordEqual from "../../middlewares/validateHashPasswordEqual.js";

const deleteEmployeeController = async (req, res) => {
    
    try {
        const employeeID  = req.params.id;
        const {passwordAdmin} = req.body;
        const adminEmail = req.email;

        const admin = await findAdminByEmail(adminEmail);
        if (!admin) {
            return res.status(404).json({message: "admin not found"});
        }

        const isPasswordValid = await validateHashPasswordEqual(passwordAdmin, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: "invalid password"});
        }

        const error = await deleteEmployeeModel(employeeID);

        if (error) {
            return res.status(400).json({ message: "one or more of the data sent are incorrect"});
        }

        return res.status(200).json({ message: "employee deleted" });
    }
    catch (err) {
        return res.status(500).send({ message: "internal server error" });  
    }
}

export default deleteEmployeeController;