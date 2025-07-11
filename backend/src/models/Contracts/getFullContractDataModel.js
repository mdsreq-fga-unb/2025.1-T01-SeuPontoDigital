import supabase from "../../config/supabase.js";

const getFullContractDataModel = async (contractId) => {
    try {
        // 1. Buscar dados do sign_contract para encontrar as relações
        const { data: signContract, error: signError } = await supabase
            .from("sign_contract")
            .select(`
                id_employer,
                id_employee,
                id_contract,
                id_address,
                employer:id_employer (
                    id, name, cpf, phone, email
                ),
                employee:id_employee (
                    id, name, cpf, phone
                ),
                contract:id_contract (
                    id, function, salary, status, access_app, start_date, end_date
                ),
                address:id_address (
                    id, cep, street, uf, neighborhood, city, house_number, complement
                )
            `)
            .eq("id_contract", contractId)
            .single();

        if (signError) {
            console.error("Error fetching sign contract:", signError);
            return null;
        }

        // 2. Buscar dados do work schedule
        const { data: workSchedule, error: scheduleError } = await supabase
            .from("work_schedules")
            .select("*")
            .eq("id_contract", contractId)
            .single();

        if (scheduleError) {
            console.error("Error fetching work schedule:", scheduleError);
        }

        // 3. Buscar dados do work break (pode ser fixed ou flex)
        let workBreak = null;
        
        // Tentar buscar fixed break primeiro
        const { data: fixedBreak, error: fixedError } = await supabase
            .from("fixed_breaks")
            .select("*")
            .eq("id_contract", contractId)
            .single();

        if (!fixedError && fixedBreak) {
            workBreak = {
                type: 'fixed',
                break_start: fixedBreak.break_start,
                break_end: fixedBreak.break_end
            };
        } else {
            // Se não tem fixed break, tentar buscar flex break
            const { data: flexBreak, error: flexError } = await supabase
                .from("flex_breaks")
                .select("*")
                .eq("id_contract", contractId)
                .single();

            if (!flexError && flexBreak) {
                workBreak = {
                    type: 'flex',
                    duration_minutes: flexBreak.duration_minutes
                };
            }
        }

        // 4. Montar objeto completo
        const fullContractData = {
            contract: signContract.contract,
            employer: signContract.employer,
            employee: signContract.employee,
            address: signContract.address,
            workSchedule: workSchedule,
            workBreak: workBreak,
            signContract: {
                id_employer: signContract.id_employer,
                id_employee: signContract.id_employee,
                id_contract: signContract.id_contract,
                id_address: signContract.id_address
            }
        };

        return fullContractData;

    } catch (err) {
        console.error("Error in getFullContractDataModel:", err);
        return null;
    }
};

export default getFullContractDataModel;
