import supabase from '@src/config/supabase.js';
import getContractsModel from '@src/models/Contracts/getContractsModel.js';

jest.mock('@src/config/supabase.js', () => ({
  from: jest.fn()
}));

test('should get data from contracts table', async () => {

  const data =  [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      start_date: '2025-06-01',
      end_data: '2025-12-01',
      status: true,
      access_app: true,
      salary: '5500.00',
      function: 'Desenvolvedor',
      employer: {
        id: 1,
        name: 'Empresa XYZ'
      }
    }
  ]

  const mockedSelect = jest.fn().mockResolvedValue({
    data,
    error: null
  });

  supabase.from.mockReturnValue({ select: mockedSelect });

  const result = await getContractsModel();

  expect(result).toEqual(data);
  expect(supabase.from).toHaveBeenCalledWith('employee_contracts');
  expect(mockedSelect).toHaveBeenCalledWith('*, employer: employer_id(id, name)');
});

test('should return error in getContractsModel', async () => {

  const expectedError = { error: 'PostgrestError' };

  const mockedSelect = jest.fn().mockResolvedValue({
    data: null,
    error: expectedError.error,
  });

  supabase.from.mockReturnValue({ select: mockedSelect });

  const result = await getContractsModel();

  expect(result).toEqual(expectedError);
});

test('should handle exception in getContractsModel', async () => {
  const mockedSelect = jest.fn().mockImplementation(() => {
    throw new Error('error in getContractsModel');
  });

  supabase.from = jest.fn().mockReturnValue({ select: mockedSelect });

  const result = await getContractsModel();


  expect(result).toBeUndefined();
});