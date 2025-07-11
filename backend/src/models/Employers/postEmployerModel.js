import supabase from "../../config/supabase.js";
import generatePhoneFormatTwilio from "../../middlewares/generatePhoneFormatTwilio.js";

const postEmployerModel = async (employer) => {
    try {
        console.log("Creating employer with data:", employer);
        
        const cleanCPF = employer.cpf.replace(/\D/g, '');
        const phoneFormatTwilio = generatePhoneFormatTwilio(employer.phone);

        console.log("Cleaned data:", {
            name: employer.name,
            cpf: cleanCPF,
            email: employer.email,
            phone: phoneFormatTwilio,
            id_address: employer.id_address
        });

        const { error } = await supabase.from("employers").insert({
            name: employer.name,
            cpf: cleanCPF,
            email: employer.email,
            phone: phoneFormatTwilio,
            id_address: employer.id_address
        });

        if (error) {
            console.error("Supabase error in postEmployerModel:", error);
            return error;
        }
        
        console.log("Employer created successfully");
        return null;
    }
    catch (err) {
        console.error("Exception in postEmployerModel:", err);
        return err;
    }
}

export default postEmployerModel;