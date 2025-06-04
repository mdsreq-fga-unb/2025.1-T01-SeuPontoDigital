import supabase from "../config/supabase.js";
import generatePasswordHash from "./generatePasswordHash.js";

const createUserPassword = async (req, res) => {
    const { id, password, confirmPassword } = req.body;

    if (!id || !password || !confirmPassword) {
        return res.status(400).send({ message: "id, password and confirmPassword are required" });
    }

    try {
        if (password !== confirmPassword) {
            return res.status(401).send({ message: "passwords must be the same" });
        }

        const passwordHash = await generatePasswordHash(password);

        const { data: employee, error: empErr } = await supabase
            .from("employee_contracts")
            .update({ password: passwordHash })
            .eq("id", id)
            .select()
            .single();

        if (employee) {
            return res.status(200).send({ message: "password updated for employee" });
        }

        // if not employee -> continue here to try fetch employer
        const { data: employer, error: empErErr } = await supabase
            .from("employers")
            .update({ password: passwordHash })
            .eq("id", id)
            .select()
            .single();

        if (employer) {
            return res.status(200).send({ message: "password updated for employer" });
        }

        return res.status(404).send({ message: "user not found" });

    } catch (err) {
        return res.status(500).send({ message: "internal server error" });
    }
};

export default createUserPassword;