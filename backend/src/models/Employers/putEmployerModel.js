import supabase from "../../config/supabase.js";
import axios from "axios";

const putEmployerModel = async (id, employerData) => {
    try {
        // Se houver dados de endereço, atualiza o endereço primeiro
        if (employerData.address) {
            const { data: currentEmployer } = await supabase
                .from('employers')
                .select('id_address')
                .eq('id', id)
                .single();

            if (currentEmployer) {
                const addressFields = { ...employerData.address };
                
                // Geocodificação do endereço
                const addressQuery = encodeURIComponent(
                    `${addressFields.street}, ${addressFields.number} - ${addressFields.neighborhood}, ${addressFields.city} - ${addressFields.state}, ${addressFields.cep}`
                );

                try {
                    const response = await axios.get(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${addressQuery}`
                    );

                    if (response.data && response.data.length > 0) {
                        addressFields.latitude = response.data[0].lat;
                        addressFields.longitude = response.data[0].lon;
                    }
                } catch (error) {
                    console.error('Geocoding error:', error);
                }

                // Atualiza o endereço
                const { error: addressError } = await supabase
                    .from('addresses')
                    .update(addressFields)
                    .eq('id', currentEmployer.id_address);

                if (addressError) throw addressError;
            }
        }

        // Remove o campo address dos dados do empregador
        delete employerData.address;

        // Atualiza os dados do empregador
        const { data: updatedEmployer, error: employerError } = await supabase
            .from('employers')
            .update(employerData)
            .eq('id', id)
            .select()
            .single();

        if (employerError) throw employerError;

        return updatedEmployer;

    } catch (error) {
        console.error('Error in putEmployerModel:', error);
        throw error;
    }
};

export default putEmployerModel;