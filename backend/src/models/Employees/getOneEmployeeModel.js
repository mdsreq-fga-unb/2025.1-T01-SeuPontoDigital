import supabase from "../../config/supabase.js";

const getOneEmployeeModel = async (id) => {
    try{
        const {data, error} = await supabase
            .from("employees")
            .select(`
                id,
                name,
                cpf,
                phone,
                created_at,
                password
            `)
            .eq("id", id)
            .single();
        
        console.log(data)

        if (error) throw new Error("failed to fetch employee");

        return data;
    }
    catch(err){
        console.error("error in getOneEmployeeModel", err);
        return null;
    }
}

export default getOneEmployeeModel;