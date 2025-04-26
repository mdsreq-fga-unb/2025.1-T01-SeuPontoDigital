import supabase from "../config/supabase.js";

const findOneAdminByEmail = async (email) => {
    try{
        const {data, error} = await supabase.from("admins").select("*").eq("email", email).single();
        if (error){
             if (error.code === "PGRST116") return null;
            }
        return data;
    }
    catch(err){
        throw err;
    }
}

const registerAdminOnDB = async (name, email, password_hash) => {
    try{
        const admin = {name, email, password_hash};
        const {error} = await supabase.from("admins").insert(admin);
        if (error){
            throw new Error(error.message);
        }
        return admin;
    }
    catch(err){
        throw err;
    }
}

export {findOneAdminByEmail, registerAdminOnDB};