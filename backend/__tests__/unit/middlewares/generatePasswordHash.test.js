/* revisar novamente o código */

import bcrypt from 'bcrypt';
import generatePasswordHash from '@src/middlewares/generatePasswordHash.js';
import { faker } from '@faker-js/faker';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));
 
describe('generatePasswordHash', () => {
  test('should generate password hash', async () => {
    const password = faker.internet.password();
    const fakeHash = faker.string.alphanumeric(60);

    bcrypt.hash.mockResolvedValue(fakeHash);

    const result = await generatePasswordHash(password);

    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    expect(result).toBe(fakeHash);
  });

  test('should not generate password hash', async () => {
    const password = faker.internet.password();
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    bcrypt.hash.mockRejectedValue(new Error("error generating password hash"));

    const result = await generatePasswordHash(password);

    expect(consoleSpy).toHaveBeenCalledWith("error generating password hash");
    expect(result).toBeNull();

    consoleSpy.mockRestore();
  });
});
