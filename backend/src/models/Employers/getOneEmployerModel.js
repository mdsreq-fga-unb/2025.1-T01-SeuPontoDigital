import supabase from "../../config/supabase.js";

const getOneEmployerModel = async (id) => {
    try{
        const {data: employer, error: employerError} = await supabase
            .from("employers")
            .select(`
                id,
                name,
                cpf,
                email,
                phone,
                id_address,
                created_at,
                address:id_address (
                    id,
                    cep,
                    street,
                    uf,
                    neighborhood,
                    city,
                    house_number,
                    complement
                )
            `)
            .eq("id", id)
            .single();

        if (employerError) throw new Error("failed to fetch employer");

        // Flatten the address data into the employer object
        if (employer && employer.address) {
            const flattenedEmployer = {
                ...employer,
                cep: employer.address.cep,
                street: employer.address.street,
                uf: employer.address.uf,
                neighborhood: employer.address.neighborhood,
                city: employer.address.city,
                house_number: employer.address.house_number,
                complement: employer.address.complement,
            };
            delete flattenedEmployer.address;
            
            return flattenedEmployer;
        }

        return employer;
    }
    catch(err){
        console.error("error in getOneEmployerModel", err);
        return null;
    }
}

export default getOneEmployerModel;