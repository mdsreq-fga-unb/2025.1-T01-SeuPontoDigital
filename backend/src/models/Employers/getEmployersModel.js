import supabase from "../../config/supabase.js";

const getEmployersModel = async () => {
    try {
        const { data, error } = await supabase
            .from("employers")
            .select(`
                id,
                name,
                cpf,
                phone,
                email,
                created_at,
                address:id_address (
                    cep,
                    street,
                    uf,
                    neighborhood,
                    city,
                    house_number,
                    complement
                )
            `);

        if (error) {
            console.error("Supabase error:", error);
            return [];
        }

        if (!data) {
            return [];
        }

        // Flatten address data for each employer
        const flattenedData = data.map(employer => {
            const { address, ...employerData } = employer;
            const flattened = {
                ...employerData,
                cep: address?.cep || "",
                street: address?.street || "",
                uf: address?.uf || "",
                neighborhood: address?.neighborhood || "",
                city: address?.city || "",
                house_number: address?.house_number || "",
                complement: address?.complement || "",
            };
            
            // Remover +55 do telefone para exibição no frontend
            if (flattened.phone && flattened.phone.startsWith('+55')) {
                flattened.phone = flattened.phone.substring(3);
            }
            
            return flattened;
        });
            
        return flattenedData;
    }
    catch (err) {
        console.error("error in getEmployersModel:", err);
        return [];
    }
}

export default getEmployersModel;