import supabase from "../../config/supabase.js";
import generatePasswordHash from "../../middlewares/generatePasswordHash.js";

const insertEmployer = async (employer) => {
    try {
        const passwordHash = await generatePasswordHash(employer.password);

        const { error } = await supabase.from("employers").insert({
            name: employer.name,
            cpf: employer.cpf,
            email: employer.email,
            phone: employer.phone,
            nacionality: employer.nacionality,
            marital_status: employer.marital_status,
            occupation: employer.occupation,
            cep: employer.cep,
            street: employer.street,
            home_number: employer.home_number,
            city: employer.city,
            state: employer.state,
            neighborhood: employer.neighborhood,
            complement: employer.complement || null,
            password: passwordHash || null,
        });
        if (error) return error;
    }
    catch (err) {
        console.error("error in insertEmployer models");
    }
}

export default insertEmployer;