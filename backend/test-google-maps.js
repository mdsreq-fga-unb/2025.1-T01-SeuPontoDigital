import { getCoordinates } from './src/middlewares/getCoordinates.js';

const testAddress = {
    cep: '71009080',
    street: 'Quadra SQB 3 Bloco M',
    house_number: '304',
    city: 'Brasília',
    uf: 'DF',
    neighborhood: 'Guará I',
    complement: 'Apto 103'
};

async function testGoogleMaps() {
    console.log('Testing Google Maps geocoding with address:', testAddress);

    try {
        const result = await getCoordinates(testAddress);
        console.log('Final result:', result);
        
        if (result) {
            console.log('✅ Coordinates found!');
            console.log(`Latitude: ${result.latitude}`);
            console.log(`Longitude: ${result.longitude}`);
        } else {
            console.log('❌ No coordinates found');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

testGoogleMaps(); 