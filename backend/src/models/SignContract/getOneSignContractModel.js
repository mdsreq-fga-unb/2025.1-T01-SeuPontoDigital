import supabase from "../../config/supabase.js";
import getOneWorkAddressModel from "../WorkAddress/getOneWorkAddressModel.js";

const getOneSignContractModel = async (contractID) => {

    try{
        const {data, error} = await supabase.from("sign_contract").select(`
                employer:id_employer (
                    id, name, cpf, phone, email, created_at
                ),
                employee:id_employee (
                    id
                ),
                contract:id_contract (
                    id, function, salary, status, access_app, start_date, end_date
                ),
                address:id_address (
                    id
                )
            `)
            .eq("id_contract", contractID)
            .single()
            
            const workplaceEmployee = await getOneWorkAddressModel(data.address.id, data.employee.id);

            const employee = workplaceEmployee.employee;
            const address = workplaceEmployee.address;

            if (error) return;

            return {...data, address, employee};
    }
    catch(err){
        console.error("error in getOneSignContractModel");
    }
}

export default getOneSignContractModel;