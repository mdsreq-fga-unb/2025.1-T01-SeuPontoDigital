import { GEOCODING_CONFIG, cleanAddressData } from '../config/geocoding.js';
import { API_KEY_MAPS } from '../config/env.js';

const getCoordinates = async (address) => {
    console.log('Debug - getCoordinates called with address:', address);
    
    // Limpar dados preservando acentos
    const cleanAddress = cleanAddressData(address);
    console.log('Debug - Cleaned address data:', cleanAddress);

    // Primeiro, tentar com Google Maps API (mais preciso para CEPs brasileiros)
    if (API_KEY_MAPS) {
        try {
            const googleResult = await getCoordinatesFromGoogleMaps(cleanAddress);
            if (googleResult) {
                console.log('Debug - Google Maps coordinates found:', googleResult);
                return googleResult;
            }
        } catch (error) {
            console.error('Debug - Google Maps API error:', error);
        }
    }

    // Fallback para LocationIQ se Google Maps falhar ou não estiver configurado
    console.log('Debug - Falling back to LocationIQ');
    return await getCoordinatesFromLocationIQ(cleanAddress);
};

// Função para obter coordenadas usando Google Maps API
const getCoordinatesFromGoogleMaps = async (address) => {
    // Montar query para Google Maps
    const query = `${address.street}, ${address.neighborhood}, ${address.city}, ${address.uf}, Brasil`;
    const encodedQuery = encodeURIComponent(query);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedQuery}&key=${API_KEY_MAPS}`;
    
    console.log('Debug - Google Maps API URL:', url);

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Debug - Google Maps API response:', data);
        
        if (data.status === 'OK' && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            console.log('Debug - Google Maps coordinates:', location);
            
            return {
                latitude: location.lat,
                longitude: location.lng
            };
        } else {
            console.error('Debug - Google Maps API: No results found or error:', data.status);
            return null;
        }
    } catch (error) {
        console.error('Debug - Google Maps API error:', error);
        return null;
    }
};

// Função para obter coordenadas usando LocationIQ (fallback)
const getCoordinatesFromLocationIQ = async (address) => {
    // Montar query simples
    const street = address.street.replaceAll(' ','+');
    const neighborhood = address.neighborhood.replaceAll(' ','+');
    const city = address.city.replaceAll(' ','+');
    const uf = address.uf.replaceAll(' ','+');

    // Montar query para LocationIQ
    const searchQuery = `${street},+${neighborhood},+${city},+${uf},+Brasil`;
    const url = `${GEOCODING_CONFIG.API_BASE_URL}?key=${GEOCODING_CONFIG.LOCATIONIQ_API_KEY}&q=${searchQuery}&format=json&limit=1`;
    
    console.log('Debug - LocationIQ API URL:', url);

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Debug - LocationIQ API response:', data);
        
        if (data && data.length > 0) {
            const location = data[0];
            console.log('Debug - LocationIQ coordinates:', location);
            return {
                latitude: parseFloat(location.lat),
                longitude: parseFloat(location.lon)
            };
        } else {
            console.error('Debug - LocationIQ API: No results found');
            return null;
        }
    } catch (error) {
        console.error('Debug - LocationIQ API error:', error);
        return null;
    }
};

export { getCoordinates };