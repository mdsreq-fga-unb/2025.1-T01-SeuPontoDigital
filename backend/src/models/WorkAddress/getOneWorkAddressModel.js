import supabase from "../../config/supabase.js";

const getOneWorkAddressModel = async(addressID, employeeID) => {
    try{
        const {data, error} = await supabase.from("work_address")
        .select(`
                address:id_address(
                    id,
                    cep,
                    street,
                    neighborhood,
                    city,
                    uf,
                    house_number,
                    complement,
                    latitude,
                    longitude
                ),
                employee:id_employee(
                    id,
                    name,
                    phone,
                    cpf,
                    created_at
                )
            `)
        .eq("id_address", addressID)
        .eq("id_employee", employeeID)
        .single();

        if (error) return;

        return data;
    }
    catch(err){
        console.error("error in getOneWorkAddressModel");
    }
}

export default getOneWorkAddressModel;