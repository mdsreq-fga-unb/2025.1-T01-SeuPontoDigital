import logger from "../../config/logger.js";
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
                    // Formatar telefone para o padrão do Twilio - sempre garantir +55 no início
                    let phone = updateFields[key].trim();
                    
                    // Se já tem o prefixo +55, manter como está
                    if (phone.startsWith('+55')) {
                        employerFields[key] = phone;
                    } else {
                        // Remover qualquer formatação (parênteses, espaços, traços) e garantir que seja apenas números
                        phone = phone.replace(/\D/g, '');
                        
                        // Se começar com 55, remover para evitar duplicação
                        if (phone.startsWith('55')) {
                            phone = phone.substring(2);
                        }
                        
                        // Sempre adicionar +55 no início
                        employerFields[key] = `+55${phone}`;
                    }
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

            // Get current address details
            const { data: currentAddress, error: addressFetchError } = await supabase
                .from("address")
                .select("*")
                .eq("id", employer.id_address)
                .single();

            logger.info(`Current address: ${JSON.stringify(currentAddress)}`);

            if (addressFetchError) return addressFetchError;

            // Combine current and new address fields
            const fullAddress = {
                ...currentAddress,
                ...addressFields
            };

            // Build address query string
            const addressQuery = `${fullAddress.street}, ${fullAddress.house_number}, ${fullAddress.neighborhood}, ${fullAddress.city}, ${fullAddress.uf}, ${fullAddress.cep}`;
            logger.info(`Address query: ${addressQuery}`);
            const encodedQuery = encodeURIComponent(addressQuery);

            // Make geocoding request
            try {
                const response = await fetch(
                    `https://us1.locationiq.com/v1/search?key=pk.05c09cb62d481ccfb76ec10ffbaf1748&q=${encodedQuery}&format=json`
                );
                
                const responseJson = await response.json();
                
                if (!response.ok) {
                    logger.error(`Geocoding request failed with status ${response.status}: ${response.statusText}`);
                    return { error: "Geocoding request failed, address is probably not valid" };
                } else {
                    addressFields.latitude = parseFloat(responseJson[0].lat);
                    addressFields.longitude = parseFloat(responseJson[0].lon);
                    logger.info(`Latitude: ${addressFields.latitude}, Longitude: ${addressFields.longitude}`);
                }
            } catch (error) {
                console.warn("Error making geocoding request:", error);
                // Continue with address update even if geocoding fails
            }

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