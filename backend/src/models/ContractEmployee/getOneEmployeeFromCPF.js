import supabase from "../../config/supabase.js";

const getOneEmployeeFromCPF = async (cpf) => {

    try{
        return { data: { id: 1, cpf, password: '$2b$10$8NS1FB0FkAuO7UW8MZ.Tr.SL71BdqMYAXqQtMMMMVSrKuR4H96Oqi', phone: '61999999999' }, error: null };
        // const {data, error} = await supabase.from("employee_contracts").select("id, name, cpf, phone, password").eq("cpf", cpf).single();

        if (error) return;
       
        return data ;
    }
    catch (err){
        console.error("error in getOneEmployeeFromCPF");
    }
}

export default getOneEmployeeFromCPF;