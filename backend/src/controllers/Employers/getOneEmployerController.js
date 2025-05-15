import supabase from "../../config/supabase.js";

const getOneEmployerController = async (req, res) => {
    try {
        const employerId = req.params.id;

        // Fetch employer details
        const { data: employer, error: employerError } = await supabase
            .from("employers")
            .select("*")
            .eq("id", employerId)
            .single();

        if (employerError || !employer) {
            return res.status(404).json({ message: "Employer not found" });
        }

        // Fetch active employees
        const { data: activeEmployees, error: activeEmployeesError } = await supabase
            .from("employee_contracts")
            .select("*")
            .eq("employer_id", employerId)
            .eq("contract_status", "ativo");

        if (activeEmployeesError) {
            console.error("Error fetching active employees:", activeEmployeesError);
            return res.status(500).json({ message: "Error fetching active employees" });
        }

        // Fetch inactive employees
        const { data: inactiveEmployees, error: inactiveEmployeesError } = await supabase
            .from("employee_contracts")
            .select("*")
            .eq("employer_id", employerId)
            .eq("contract_status", "inativo");

        if (inactiveEmployeesError) {
            console.error("Error fetching inactive employees:", inactiveEmployeesError);
            return res.status(500).json({ message: "Error fetching inactive employees" });
        }

        // Return employer details with active and inactive employees
        return res.status(200).json({
            ...employer,
            activeEmployees,
            inactiveEmployees,
        });
    } catch (err) {
        console.error("Error in getOneEmployerController:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default getOneEmployerController;