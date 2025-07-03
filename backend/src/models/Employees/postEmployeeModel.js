import supabase from "../../config/supabase.js";
import generatePhoneFormatTwilio from "../../middlewares/generatePhoneFormatTwilio.js";

const postEmployeeModel = async (employee) => {
    try {
        const cleanCPF = employee.cpf.replace(/\D/g, '');
        const phoneFormatTwilio = generatePhoneFormatTwilio(employee.phone);
        
        const { data: employeeID, error } = await supabase.from("employees").insert({
            name: employee.name,
            cpf: cleanCPF,
            phone: phoneFormatTwilio
        }).select("id");

        if (error) return { error };
        
        return employeeID[0]?.id;
    }
    catch (err) {
        console.error("error in insertEmployee model");
        return { error: "failed to insert employee" };
    }
}

export default postEmployeeModel;