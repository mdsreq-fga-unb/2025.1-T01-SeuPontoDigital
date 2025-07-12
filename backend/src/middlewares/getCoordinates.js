import { API_KEY_MAPS } from "../config/env.js";

const getCoordinates = async (address) => {
    const street = address.street.replaceAll(' ','+');
    const neighborhood = address.neighborhood.replaceAll(' ','+');
    const city = address.city.replaceAll(' ','+');
    const uf = address.uf.replaceAll(' ','+');

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${street},+${neighborhood},+${city},+${uf}&key=${API_KEY_MAPS}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === 'OK' && data.results.length > 0) {
            const location = data.results[0].geometry.location;

            return {
                latitude: location.lat,
                longitude: location.lng
            };
                
        } else {
            throw new Error('Endereço não encontrado');
        }
    } catch (error) {
        console.error('Erro ao obter coordenadas:', error);
        return null;
    }
};

export { getCoordinates };