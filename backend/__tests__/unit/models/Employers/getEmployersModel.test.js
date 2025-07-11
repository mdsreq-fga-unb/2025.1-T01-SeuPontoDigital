import supabase from '@src/config/supabase.js';
import  getEmployersModel from '@src/models/Employers/getEmployersModel.js';
import employersBuilder from '@helper/builder/employersBuilder.js';

jest.mock('@src/config/supabase.js', () => ({
    from: jest.fn()
}));

test('should get data from employers table', async() => {

    const data = employersBuilder();

    const mockedSelect = jest.fn().mockResolvedValue({
        data,
        error: null
    });

    supabase.from.mockReturnValue({ select: mockedSelect });
    const result = await getEmployersModel();

    expect(result).toEqual(data);
    expect(supabase.from).toHaveBeenCalledWith('employers');
    expect(mockedSelect).toHaveBeenCalledWith('*');
});

test('should return error in getEmployersModel', async () => {

    const expectedError = { error: 'PostgrestError' };

    const mockedSelect = jest.fn().mockResolvedValue({
        data: null,
        error: expectedError.error,
    });

    supabase.from.mockReturnValue({ select: mockedSelect });

    const result = await getEmployersModel();

    expect(result).toEqual(expectedError);
});

test('should handle exception in getEmployersModel', async () => {
  const mockedSelect = jest.fn().mockImplementation(() => {
    throw new Error('error in getEmployersModel');
  });

  supabase.from = jest.fn().mockReturnValue({ select: mockedSelect });

  const result = await getEmployersModel();


  expect(result).toBeUndefined();
});