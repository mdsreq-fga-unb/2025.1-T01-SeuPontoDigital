const getCoordinates = async (address) => {
    console.log('Debug - getCoordinates called with address:', address);
    
    const street = address.street.replaceAll(' ','+');
    const neighborhood = address.neighborhood.replaceAll(' ','+');
    const city = address.city.replaceAll(' ','+');
    const uf = address.uf.replaceAll(' ','+');

    // Usar LocationIQ - API mais confiável para endereços brasileiros
    const searchQuery = `${street},+${neighborhood},+${city},+${uf},+Brasil`;
    const url = `https://us1.locationiq.com/v1/search.php?key=pk.05c09cb62d481ccfb76ec10ffbaf1748&q=${searchQuery}&format=json&limit=1`;
    
    console.log('Debug - LocationIQ API URL:', url);

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Debug - LocationIQ API response:', data);
        
        if (data && data.length > 0) {
            const location = data[0];
            console.log('Debug - Found coordinates:', location);

            return {
                latitude: parseFloat(location.lat),
                longitude: parseFloat(location.lon)
            };
        } else {
            console.error('Debug - LocationIQ API: No results found');
            return null;
        }
    } catch (error) {
        console.error('Erro ao obter coordenadas:', error);
        return null;
    }
};

export { getCoordinates };