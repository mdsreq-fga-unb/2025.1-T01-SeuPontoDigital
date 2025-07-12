import supabase from "../../config/supabase.js";
import getOneAddressModel from "./getOneAddressModel.js";
import { getCoordinates } from "../../middlewares/getCoordinates.js";

const postAddressModel = async (address) => {
    try{
        const {latitude, longitude} = await getCoordinates(address);

        console.log(latitude, longitude)

        const addressID = await getOneAddressModel(address)
        if (!addressID){
            console.log("Address not found, creating new one");
            const { data, error } = await supabase.from("address").insert({
            cep: address.cep,
            street: address.street,
            uf: address.uf,
            neighborhood: address.neighborhood,
            city: address.city,
            house_number: address.house_number,
            complement: address.complement || null,
            latitude: latitude,
            longitude: longitude
            }).select("id");

            if (error || !data || data.length === 0) {
                console.error("Error creating address:", error);
                return null;
            }

            console.log("New address created with ID:", data[0].id);
            return data[0].id;
        } 
        
        console.log("Using existing address ID:", addressID);
        return addressID;
    }
    catch (err){
        console.error("Exception in postAddressModel:", err);
        return null;
    }
}

export default postAddressModel;