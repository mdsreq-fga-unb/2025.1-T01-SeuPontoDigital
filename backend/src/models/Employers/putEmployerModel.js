import supabase from "../../config/supabase.js";

const putEmployerModel = async (employerID, updateFields) => {
    try {
        // Separar dados do employer dos dados do endereço
        const employerFields = {};
        const addressFields = {};
        
        // Campos que vão para a tabela employers
        const employerColumns = ['name', 'cpf', 'email', 'phone', 'password'];
        // Campos que vão para a tabela address
        const addressColumns = ['cep', 'street', 'uf', 'neighborhood', 'city', 'house_number', 'complement'];
        
        // Separar os campos
        Object.keys(updateFields).forEach(key => {
            if (employerColumns.includes(key)) {
                if (key === 'cpf' && updateFields[key]) {
                    // Limpar CPF removendo formatação
                    employerFields[key] = updateFields[key].replace(/\D/g, '');
                } else if (key === 'phone' && updateFields[key]) {
                    // Formatar telefone para o padrão do Twilio se necessário
                    const phone = updateFields[key].replace(/\D/g, '');
                    employerFields[key] = phone.startsWith('55') ? `+${phone}` : `+55${phone}`;
                } else {
                    employerFields[key] = updateFields[key];
                }
            } else if (addressColumns.includes(key)) {
                addressFields[key] = updateFields[key];
            }
        });

        // Buscar o id_address do employer
        const { data: employer, error: employerFetchError } = await supabase
            .from("employers")
            .select("id_address")
            .eq("id", employerID)
            .single();

        if (employerFetchError) return employerFetchError;

        // Atualizar dados do employer se houver
        if (Object.keys(employerFields).length > 0) {
            const { error: employerUpdateError } = await supabase
                .from("employers")
                .update(employerFields)
                .eq("id", employerID);

            if (employerUpdateError) return employerUpdateError;
        }

        // Atualizar dados do endereço se houver
        if (Object.keys(addressFields).length > 0 && employer.id_address) {
            const { error: addressUpdateError } = await supabase
                .from("address")
                .update(addressFields)
                .eq("id", employer.id_address);

            if (addressUpdateError) return addressUpdateError;
        }

        return null;
    }
    catch (err) {
        console.error("error in putEmployerModel", err);
        return err;
    }
}

export default putEmployerModel;