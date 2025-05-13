import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // colocar todas as colunas desejadas aqui
    name: "",
    cpf: "",
    email: "",
    phone: "",
    nationality: "",
    marital_status: "",
    job_function: "",
    rg: "",
    cep: "",
    street: "",
    home_number: "",
    city: "",
    state: "",
    neighborhood: "",
    complement: "",
    id_employer: "",
    id_employee: "",
    function: "",
    daily_hour: "",
    days_number: "",
    clock_in: "",
    clock_out: "",
    break_start: "",
    break_end: "",
    salary: "",
    date_start: "",    
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
