import supabase from "../../config/supabase.js";
import { getCoordinates } from "../../middlewares/getCoordinates.js";

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
            throw new Error('Empregador não encontrado');
        }

        console.log('Debug - Existing employer:', existingEmployer);

        // Separate employer and address fields
        const employerKeys = ['name', 'cpf', 'email', 'phone'];
        const addressKeys = ['cep', 'street', 'house_number', 'city', 'uf', 'neighborhood', 'complement'];

        const employerFields = {};
        const addressFields = {};

        // Organize fields
        Object.keys(employerData).forEach(key => {
            if (employerKeys.includes(key)) {
                employerFields[key] = employerData[key];
            } else if (addressKeys.includes(key)) {
                addressFields[key] = employerData[key];
            }
        });

        console.log('Debug - Employer fields to update:', employerFields);
        console.log('Debug - Address fields to update:', addressFields);

        // Update employer if there are fields to update
        if (Object.keys(employerFields).length > 0) {
            const { error: employerError } = await supabase
                .from('employers')
                .update(employerFields)
                .eq('id', id);

            if (employerError) {
                console.error('Debug - Error updating employer:', employerError);
                throw new Error(`Erro ao atualizar empregador: ${employerError.message}`);
            }
            console.log('Debug - Employer updated successfully');
        }

        // Update address if there are fields to update
        if (Object.keys(addressFields).length > 0) {
            console.log('Debug - Updating address with:', addressFields);
            
            // Get coordinates from address using the existing API
            console.log('Debug - Calling getCoordinates with address:', addressFields);
            const coordinates = await getCoordinates(addressFields);
            console.log('Debug - Calculated coordinates:', coordinates);
            
            if (coordinates) {
                addressFields.latitude = coordinates.latitude;
                addressFields.longitude = coordinates.longitude;
                console.log(`Debug - Address fields with coordinates (${coordinates.confidence} confidence):`, addressFields);
            } else {
                console.warn('Debug - Could not calculate coordinates for address');
                console.log('Debug - Address fields without coordinates:', addressFields);
            }

            const { error: addressError } = await supabase
                .from('address')
                .update(addressFields)
                .eq('id', existingEmployer.id_address);

            if (addressError) {
                console.error('Debug - Error updating address:', addressError);
                throw new Error(`Erro ao atualizar endereço: ${addressError.message}`);
            }
            console.log('Debug - Address updated successfully');
        }

        // Fetch updated employer data
        const { data: updatedEmployer, error: fetchError } = await supabase
            .from('employers')
            .select(`
                *,
                address:id_address (*)
            `)
            .eq('id', id)
            .single();

        if (fetchError) {
            console.error('Debug - Error fetching updated employer:', fetchError);
            throw new Error(`Erro ao buscar empregador atualizado: ${fetchError.message}`);
        }

        console.log('Debug - Update completed successfully');
        return updatedEmployer;

    } catch (error) {
        console.error('Debug - Error in putEmployerModel:', error);
        throw error;
    }
};

export default putEmployerModel;