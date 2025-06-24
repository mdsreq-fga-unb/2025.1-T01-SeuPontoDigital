import supabase from "../../config/supabase.js";

const getAllSignContractModel = async() => {

    try{
        const {data, error} = await supabase.from("sign_contract")
        .select(`
            employer:id_employer (
                id, name, cpf, phone, email, created_at
            ),
            employee:id_employee (
                id, name, cpf, phone, created_at
            ),
            contract:id_contract (
                id, function, salary, status, access_app, start_date, end_date
            ),
            address:id_address (
                id, cep, uf, neighborhood, city, street, house_number, complement
            )
        `);

        if (error) return;

        return data;
    }
    catch(err){
        console.error("error in getAllSignContractModel");
    }
}

export default getAllSignContractModel;