import supabase from "../../config/supabase.js";

const insertEmployee = async (employee) => {
    try {
        const { error } = await supabase.from("users").insert({
            name: employee.name,
            cpf: employee.cpf,
            email: employee.email,
            phone: employee.phone,
            nacionality: employee.nacionality,
            marital_status: employee.marital_status,
            occupation: employee.occupation,
            rg: employee.rg,
            cep: employee.cep,
            street: employee.street,
            home_number: employee.home_number,
            city: employee.city,
            state: employee.state,
            neighborhood: employee.neighborhood,
            complement: employee.complement || null,
            password: employee.password || null,
            role: 0,
        });
        if (error) return error;
    } catch (err) {
        console.error("error in insertEmployee models:", err);
        throw err;
    }
}

export default insertEmployee;