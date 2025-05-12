import supabase from "../../config/supabase.js";
import generatePasswordHash from "../../middlewares/generatePasswordHash.js";

const insertEmployee = async (employee) => {
    try {
        const passwordHash = await generatePasswordHash(employee.password);

        const { error } = await supabase.from("employees").insert({
            name: employee.name,
            cpf: employee.cpf,
            email: employee.email,
            phone: employee.phone,
            nacionality: employee.nacionality,
            marital_status: employee.marital_status,
            occupation: employee.occupation,
            number_work_card: employee.number_work_card || null,
            serie_work_card: employee.serie_work_card || null,
            uf_work_card: employee.uf_work_card || null,
            password: passwordHash || null,
        });
        if (error) return error;

    } catch (err) {
        console.error("error in insertEmployee models");
    }
}

export default insertEmployee;