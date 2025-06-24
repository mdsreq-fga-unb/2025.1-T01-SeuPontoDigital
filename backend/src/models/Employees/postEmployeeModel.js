import supabase from "../../config/supabase.js";
import generatePhoneFormatTwilio from "../../middlewares/generatePhoneFormatTwilio.js";

const postEmployeeModel = async (employee) => {
    try {
        const cleanCPF = employee.cpf.replace(/\D/g, '');
        const phoneFormatTwilio = generatePhoneFormatTwilio(employee.phone);
        
        const { error } = await supabase.from("employees").insert({
            name: employee.name,
            cpf: cleanCPF,
            phone: phoneFormatTwilio
        });

        if (error) return error;
    }
    catch (err) {
        console.error("error in insertEmployee model");
    }
}

export default postEmployeeModel;