import getOneEmployeeFromCPF from "../../models/ContractEmployee/getOneEmployeeFromCPF.js";
import getOneEmployerFromCPF from "../../models/Employers/getOneEmployerFromCPF.js";
import generatePasswordHash from "../../middlewares/generatePasswordHash.js";
import verifySMS from "../../middlewares/verifySMS.js";
import supabase from "../../config/supabase.js";

const createPassword = async (req, res) => {
    const { cpf, password, confirmPassword, code } = req.body;

    console.log("[createPassword] Request body:", req.body);

    if (!cpf || !password || !confirmPassword || !code) {
        console.warn("[createPassword] Missing required fields");
        return res.status(400).send({ message: "cpf, password, confirmPassword and code are required" });
    }

    try {
        let user = await getOneEmployeeFromCPF(cpf);
        let userType = "employee";
        let table = "employee_contracts";

        console.log("[createPassword] Employee lookup:", user);

        if (!user) {
            user = await getOneEmployerFromCPF(cpf);
            userType = "employer";
            table = "employers";
            console.log("[createPassword] Employer lookup:", user);
        }

        if (!user) {
            console.warn("[createPassword] User not found for CPF:", cpf);
            return res.status(404).send({ message: "user not found" });
        }

        if (user.password) {
            console.warn(`[createPassword] ${userType} already has an account`);
            return res.status(401).send({ message: `${userType} already has an account` });
        }

        const isValidCode = await verifySMS(user.phone, code);
        console.log("[createPassword] SMS verification result:", isValidCode);

        if (!isValidCode) {
            console.warn("[createPassword] Invalid code for phone:", user.phone);
            return res.status(400).send({ message: "invalid code" });
        }

        if (password !== confirmPassword) {
            console.warn("[createPassword] Passwords do not match");
            return res.status(401).send({ message: "passwords must be the same" });
        }

        const passwordHash = await generatePasswordHash(password);
        console.log("[createPassword] Generated password hash");

        const { data, error } = await supabase
            .from(table)
            .update({ password: passwordHash })
            .eq("id", user.id)
            .select()
            .single();

        if (error) {
            console.error("[createPassword] Error updating password:", error);
            return res.status(500).send({ message: "error updating password" });
        }

        console.log("[createPassword] Password updated successfully for user id:", user.id);

        return res.status(200).send({ message: "password created successfully" });

    } catch (err) {
        console.error("[createPassword] Internal server error:", err);
        return res.status(500).send({ message: "internal server error" });
    }
};

export default createPassword;