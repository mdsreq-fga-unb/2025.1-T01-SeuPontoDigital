import supabase from "../../config/supabase.js";

const insertEmployee = async (employee) => {
    try {
        const { error } = await supabase.from("users").insert({
            name: employee.name,
            cpf: employee.cpf,
            email: employee.email,
            phone: employee.phone,
            password: employee.password,
            role: 0,
            created_at: employee.created_at,
            nacionality: employee.nacionality,
            marital_status: employee.marital_status,
            occupation: employee.occupation,
            rg: employee.rg,
            cep: employee.cep,
            street: employee.street,
            home_number: employee.home_number,
            city: employee.city,
        });
        if (error) return error;
    } catch (err) {
        console.error("error in insertEmployee models:", err);
        throw err;
    }
}

export default insertEmployee;