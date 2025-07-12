import { getCoordinates } from './src/middlewares/getCoordinates.js';

const testAddress = {
    cep: '72610510',
    street: 'Quadra 205 Conjunto 10',
    house_number: '304',
    city: 'Brasília',
    uf: 'DF',
    neighborhood: 'Recanto das Emas',
    complement: 'Apto 103'
};

async function testGeocoding() {
    console.log('Testing geocoding with address:', testAddress);

    try {
        const result = await getCoordinates(testAddress);
        console.log('Final result:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}

testGeocoding(); 