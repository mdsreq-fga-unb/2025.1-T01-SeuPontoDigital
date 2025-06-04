import supabase from "../config/supabase.js";

const checkPasswordIsNull = async (req, res, next) => {
    const { cpf } = req.body;

    try {
        const { data: employee, error: empError } = await supabase
            .from("employee_contracts")
            .select("password")
            .eq("cpf", cpf)
            .single();

        if (employee && employee.password) {
            return res.status(401).send({ message: "employee already has an account" });
        }

        const { data: employer, error: empErError } = await supabase
            .from("employers")
            .select("password")
            .eq("cpf", cpf)
            .single();

        if (employer && employer.password) {
            return res.status(401).send({ message: "employer already has an account" });
        }
        next();
    } catch (err) {
        return res.status(500).send({ message: "not found users with these data" });
    }
}

export default checkPasswordIsNull;