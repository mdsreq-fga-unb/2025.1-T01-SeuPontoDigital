import supabase from "../../config/supabase.js";

const putEmployerModel = async (id, employerData) => {
    try {
        console.log('Debug - Starting update for employer:', id);
        console.log('Debug - Received data:', employerData);

        // First check if employer exists
        const { data: existingEmployer, error: checkError } = await supabase
            .from('employers')
            .select(`
                *,
                address:id_address (*)
            `)
            .eq('id', id)
            .single();

        if (checkError) {
            console.error('Debug - Error checking employer:', checkError);
            throw new Error(`Erro ao verificar empregador: ${checkError.message}`);
        }

        if (!existingEmployer) {
            console.error('Debug - Employer not found:', id);
            throw new Error('Empregador não encontrado');
        }

        if (!existingEmployer.id_address) {
            console.error('Debug - Address ID not found for employer:', id);
            throw new Error('ID do endereço não encontrado para este empregador');
        }

        console.log('Debug - Existing employer data:', existingEmployer);
        console.log('Debug - Address ID to update:', existingEmployer.id_address);

        // Separate address fields from employer data
        const addressFields = {};
        const employerFields = {};

        // Known address fields
        const addressKeys = ['cep', 'street', 'house_number', 'city', 'uf', 'neighborhood', 'complement'];

        // Separate fields into appropriate objects, ignoring id and id_address
        Object.entries(employerData).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                if (addressKeys.includes(key)) {
                    addressFields[key] = value;
                } else if (key !== 'id' && key !== 'id_address') {
                    employerFields[key] = value;
                }
            }
        });

        console.log('Debug - Separated data:', {
            addressFields,
            employerFields
        });

        let updatedAddress = existingEmployer.address;
        let updatedEmployer = existingEmployer;

        // Update address if there are any address fields
        if (Object.keys(addressFields).length > 0) {
            console.log('Debug - Updating address with:', addressFields);
            console.log('Debug - Address ID being updated:', existingEmployer.id_address);
            
            // First, let's check if the address exists
            const { data: existingAddress, error: addressCheckError } = await supabase
                .from('address')
                .select('*')
                .eq('id', existingEmployer.id_address)
                .single();

            if (addressCheckError) {
                console.error('Debug - Error checking address:', addressCheckError);
                throw new Error(`Erro ao verificar endereço: ${addressCheckError.message}`);
            }

            if (!existingAddress) {
                console.error('Debug - Address not found:', existingEmployer.id_address);
                throw new Error('Endereço não encontrado no banco de dados');
            }

            console.log('Debug - Existing address found:', existingAddress);

            // Now try to update the address
            const { data: address, error: addressError } = await supabase
                .from('address')
                .update(addressFields)
                .eq('id', existingEmployer.id_address)
                .select()
                .single();

            if (addressError) {
                console.error('Debug - Error updating address:', addressError);
                console.error('Debug - Address error details:', {
                    message: addressError.message,
                    details: addressError.details,
                    hint: addressError.hint,
                    code: addressError.code
                });
                throw new Error(`Erro ao atualizar endereço: ${addressError.message}`);
            }

            updatedAddress = address;
            console.log('Debug - Address updated successfully:', updatedAddress);
        }

        // Update employer if there are any employer fields
        if (Object.keys(employerFields).length > 0) {
            console.log('Debug - Updating employer with:', employerFields);
            const { data: employer, error: employerError } = await supabase
                .from('employers')
                .update(employerFields)
                .eq('id', id)
                .select()
                .single();

            if (employerError) {
                console.error('Debug - Error updating employer:', employerError);
                throw new Error(`Erro ao atualizar empregador: ${employerError.message}`);
            }

            updatedEmployer = employer;
            console.log('Debug - Employer updated successfully:', updatedEmployer);
        }

        // Return the combined updated data
        const result = {
            ...updatedEmployer,
            address: updatedAddress
        };

        console.log('Debug - Returning updated data:', result);
        return result;

    } catch (error) {
        console.error('Debug - Error in putEmployerModel:', error);
        throw error;
    }
};

export default putEmployerModel;