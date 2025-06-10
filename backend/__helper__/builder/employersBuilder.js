import { faker } from '@faker-js/faker';

/*
const generateFakeCpf = () => {

}
*/

const generateFakeBrazilianPhoneNumber = () => {
	const ddd = faker.helpers.arrayElement([
		'11', '12', '15', '16', '17', '18', '19', 
		'21', '22', '24', 
		'31', '32', '33', '34', '35', '37', '38', 
		'41', '42', '43', '44', '45', '46',
		'51', '53', '54', '55',
		'61', '63',
		'71', '74', '77',
		'82', '85', 
		'95', '96'
	]);
  	const number = `9${faker.string.numeric(8)}`;
  	return `${ddd}${number}`;
} 

const employersBuilder = () => {
	const data = {
		id: faker.string.uuid(),
		name: faker.person.fullName(),
		cpf: faker.string.numeric({ min: 8}), // isso vai ser alterado no futuro através de generateFakeCpf()
		phone: generateFakeBrazilianPhoneNumber(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		id_address: faker.string.uuid(),
	};
	return data;
}

export default employersBuilder;