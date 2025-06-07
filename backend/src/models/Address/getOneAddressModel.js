import supabase from "../../config/supabase.js";

const getOneAddressModel = async (address) => {
    const { data, error } = await supabase.from("address")
        .select("id")
        .eq("cep", address.cep)
        .eq("street", address.street)
        .eq("uf", address.uf)
        .eq("neighborhood", address.neighborhood)
        .eq("city", address.city)
        .eq("house_number", address.house_number);

    if (error || !data || data.length === 0) return;

    return data[0].id;
}

export default getOneAddressModel;