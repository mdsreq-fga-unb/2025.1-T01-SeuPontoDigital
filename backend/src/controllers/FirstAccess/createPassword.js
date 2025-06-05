import getOneEmployeeFromCPF from "../../models/ContractEmployee/getOneEmployeeFromCPF.js";
import getOneEmployerFromCPF from "../../models/Employers/getOneEmployerFromCPF.js";
import generatePasswordHash from "../../middlewares/generatePasswordHash.js";
import verifySMS from "../../middlewares/verifySMS.js";
import supabase from "../../config/supabase.js";

const createPassword = async (req, res) => {
    const { cpf, password, confirmPassword, code } = req.body;

    if (!cpf || !password || !confirmPassword || !code) {
        
        return res.status(400).send({ message: "cpf, password, confirmPassword and code are required" });
    }

    try {
        let user = await getOneEmployeeFromCPF(cpf);
        let userType = "employee";
        let table = "employee_contracts";

        if (!user) {
            user = await getOneEmployerFromCPF(cpf);
            userType = "employer";
            table = "employers";
            console.log("[createPassword] Employer lookup:", user);
        }

        if (!user) {
            return res.status(404).send({ message: "user not found" });
        }

        if (user.password) {
            return res.status(401).send({ message: `${userType} already has an account` });
        }

        const isValidCode = await verifySMS(user.phone, code);

        if (!isValidCode) {
            return res.status(400).send({ message: "invalid code" });
        }

        if (password !== confirmPassword) {
            return res.status(401).send({ message: "passwords must be the same" });
        }

        const passwordHash = await generatePasswordHash(password);

        const { data, error } = await supabase
            .from(table)
            .update({ password: passwordHash })
            .eq("id", user.id)
            .select()
            .single();

        if (error) {
            return res.status(500).send({ message: "error updating password" });
        }

        return res.status(200).send({ message: "password created successfully" });
    } 
    catch (err){
        return res.status(500).send({ message: "internal server error" });
    }
}

export default createPassword;