import supabase from "../../config/supabase.js";

const getEmployeesModel = async () => {
    try {
        const { data, error } = await supabase
            .from("employees")
            .select(`
                id,
                name,
                cpf,
                phone,
                created_at
            `);

        if (error) {
            console.error("Supabase error:", error);
            return [];
        }

        if (!data) {
            return [];
        }

        return data;
    }
    catch (err) {
        console.error("error in getEmployeesModel:", err);
        return [];
    }
}

export default getEmployeesModel;