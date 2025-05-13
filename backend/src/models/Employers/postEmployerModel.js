import supabase from "../../config/supabase.js";
import generatePasswordHash from "../../middlewares/generatePasswordHash.js";

const postEmployerModel = async (employer) => {
    try {
        const passwordHash = await generatePasswordHash(employer.password);

        const { error } = await supabase.from("employers").insert({
            name: employer.name,
            cpf: employer.cpf,
            email: employer.email,
            phone: employer.phone,
            nationality: employer.nationality,
            marital_status: employer.marital_status,
            job_function: employer.job_function,
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

export default postEmployerModel;