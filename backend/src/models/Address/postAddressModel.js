import supabase from "../../config/supabase.js";
import getOneAddressModel from "./getOneAddressModel.js";
import getCoordinates from "../../middlewares/getCoordinates.js";

const postAddressModel = async (address) => {

    try{
        const {latitude, longitude} = await getCoordinates(address);

        console.log(latitude, longitude)

        const addressID = await getOneAddressModel(address)
        if (!addressID){
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

            if (error || !data || data.length === 0) return;

            return data[0].id;
        } 
        return addressID;
    }
    catch (err){
        console.log("error in postAddressModel")
    }
    
}

export default postAddressModel;