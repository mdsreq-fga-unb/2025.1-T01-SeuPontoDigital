import supabase from "../../config/supabase.js";

const putAddressModel = async (addressId, addressData) => {
    try {
        const { error } = await supabase
            .from("address")
            .update({
                cep: addressData.cep,
                street: addressData.street,
                uf: addressData.uf,
                neighborhood: addressData.neighborhood,
                city: addressData.city,
                house_number: addressData.house_number,
                complement: addressData.complement || null
            })
            .eq("id", addressId);

        if (error) return error;
        
        return null;
    } catch (err) {
        console.error("error in putAddressModel", err);
        return err;
    }
}

export default putAddressModel;
