import supabase from "../../config/supabase.js";

const getOneSignContractController = async (req, res) => {
    try {
        const contractID = req.params.id;

        const { data, error } = await supabase.from("sign_contract")
            .select(`
                employer:id_employer (
                    id, name, cpf, phone, email, created_at
                ),
                employee:id_employee (
                    id, name, cpf, phone, created_at
                ),
                contract:id_contract (
                    id, function, salary, status, access_app, start_date, end_date
                ),
                address:id_address (
                    id, cep, uf, neighborhood, street, house_number, complement
                )
            `)
            .eq("id_contract", contractID)
            .single();

        if (error || !data) {
            return res.status(404).json({ message: "sign contract not found" });
        }

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
};

export default getOneSignContractController;
