import getOneEmployeeFromCPF from "../../models/ContractEmployee/getOneEmployeeFromCPF.js";
import getOneEmployerFromCPF from "../../models/Employers/getOneEmployerFromCPF.js";
import generatePasswordHash from "../../middlewares/generatePasswordHash.js";
import verifySMS from "../../middlewares/verifySMS.js";
import supabase from "../../config/supabase.js";

const createPassword = async (req, res) => {
    const { cpf, password, confirmPassword, code } = req.body;

    if (!cpf || !password || !confirmPassword || !code) {
        return res.status(400).send({ message: "CPF, password, password confirmation, and code are required." });
    }

    try {
        let user = await getOneEmployeeFromCPF(cpf);
        let userType = "Funcionário";
        let table = "employee_contracts";

        if (!user) {
            user = await getOneEmployerFromCPF(cpf);
            userType = "Empregador";
            table = "employers";
        }

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        if (user.password) {
            return res.status(401).send({ message: `${userType} already has an account.` });
        }

        const isValidCode = await verifySMS(user.phone, code);

        if (!isValidCode) {
            return res.status(400).send({ message: "Invalid code" });
        }

        if (password !== confirmPassword) {
            return res.status(401).send({ message: "Passwords must match" });
        }

        const passwordHash = await generatePasswordHash(password);

        const { data, error } = await supabase
            .from(table)
            .update({ password: passwordHash })
            .eq("id", user.id)
            .select()
            .single();

        if (error) {
            return res.status(500).send({ message: "Error updating password" });
        }

        return res.status(200).send({ message: "Password successfully created" });
    } 
    catch (err){
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

export default createPassword;