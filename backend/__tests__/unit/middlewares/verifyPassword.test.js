import bcrypt from 'bcrypt';
import verifyPassword from '@src/middlewares/verifyPassword.js';
import { faker } from '@faker-js/faker';

jest.mock('bcrypt', () => ({
    compare: jest.fn()
}));

describe('verifyPassword', () => {
    test('should return true when passwords match', async() => {
        const loginPassword = faker.internet.password();
        const storedPassword = faker.string.alphanumeric(60);

        bcrypt.compare.mockResolvedValue(true);
        const result = await verifyPassword(loginPassword, storedPassword);

        expect(bcrypt.compare).toHaveBeenCalledWith(loginPassword, storedPassword);
        expect(result).toBe(true);
    }); 

    test('should return false when passwords does not match', async() => {
        const loginPassword = faker.internet.password();
        const storedPassword = faker.string.alphanumeric(60);

        bcrypt.compare.mockResolvedValue(false);
        const result = await verifyPassword(loginPassword, storedPassword);

        expect(bcrypt.compare).toHaveBeenCalledWith(loginPassword, storedPassword);
        expect(result).toBe(false);

    })

    test('should log an error if verifying the password hash fails', async () => {
        const loginPassword = faker.internet.password();
        const storedPassword = faker.string.alphanumeric(60);

        const error = new Error('an error occurred while verifying the password hash');

        bcrypt.compare.mockRejectedValue(error);

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await expect(
            verifyPassword(loginPassword, storedPassword)
        ).rejects.toThrow('an error occurred while verifying the password hash');

        expect(consoleSpy).toHaveBeenCalledWith(
            'an error occurred while verifying the password hash'
        );

        consoleSpy.mockRestore(); 
    });

});