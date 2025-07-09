import postEmployeeModel from "../../models/Employees/postEmployeeModel.js";
import postEmployModel from "../../models/Employ/postEmployModel.js";
import postContractModel from "../../models/Contracts/postContractModel.js";
import postAddressModel from "../../models/Address/postAddressModel.js";
import postSignContractModel from "../../models/SignContract/postSignContractModel.js";
import postWorkScheduleModel from "../../models/WorkSchedule/postWorkScheduleModel.js";
import postWorkBreakModel from "../../models/WorkBreaks/postBreakModel.js";

const postCompleteContractController = async (req, res) => {
    try {
        const {
            // Dados do funcionário
            employee,
            // Dados do contrato
            contract,
            // Dados do endereço
            address,
            // Dados da jornada de trabalho
            workSchedule,
            // Dados do intervalo
            workBreak,
            // ID do empregador
            employerId
        } = req.body;

        // Validações básicas
        if (!employee || !contract || !address || !workSchedule || !workBreak || !employerId) {
            return res.status(400).json({ 
                message: "Todos os dados são obrigatórios: employee, contract, address, workSchedule, workBreak, employerId" 
            });
        }

        // Validar dados do funcionário
        if (!employee.name || !employee.cpf) {
            return res.status(400).json({ message: "Nome e CPF do funcionário são obrigatórios" });
        }

        // Validar dados do contrato
        if (!contract.function || !contract.salary) {
            return res.status(400).json({ message: "Função e salário são obrigatórios" });
        }

        // Iniciar transação simulada (vamos fazer em sequência e reverter em caso de erro)
        let createdEmployeeId, createdContractId, createdAddressId;

        try {
            // 1. Criar funcionário
            console.log("Creating employee:", employee);
            const employeeResult = await postEmployeeModel(employee);
            if (!employeeResult || employeeResult.error) {
                throw new Error("Falha ao criar funcionário: " + (employeeResult?.error || "ID não retornado"));
            }
            createdEmployeeId = employeeResult;

            // 2. Criar relacionamento empregador-funcionário
            console.log("Creating employ relationship:", { employerId, employeeId: createdEmployeeId });
            const employError = await postEmployModel(employerId, createdEmployeeId);
            if (employError) {
                throw new Error("Falha ao criar relacionamento empregador-funcionário");
            }

            // 3. Criar contrato
            console.log("Creating contract:", contract);
            createdContractId = await postContractModel(contract);
            if (!createdContractId) {
                throw new Error("Falha ao criar contrato");
            }

            // 4. Criar endereço
            console.log("Creating address:", address);
            createdAddressId = await postAddressModel(address);
            if (!createdAddressId) {
                throw new Error("Falha ao criar endereço");
            }

            // 5. Criar sign_contract (relacionamento entre todas as entidades)
            console.log("Creating sign contract:", { 
                employerId, 
                employeeId: createdEmployeeId, 
                contractId: createdContractId, 
                addressId: createdAddressId 
            });
            const signContractError = await postSignContractModel(
                employerId, 
                createdEmployeeId, 
                createdContractId, 
                createdAddressId
            );
            if (signContractError) {
                throw new Error("Falha ao criar assinatura do contrato");
            }

            // 6. Criar jornada de trabalho
            console.log("Creating work schedule:", workSchedule, "for contract:", createdContractId);
            const workScheduleError = await postWorkScheduleModel(workSchedule, createdContractId);
            if (workScheduleError) {
                throw new Error("Falha ao criar jornada de trabalho");
            }

            // 7. Criar intervalo de trabalho
            console.log("Creating work break:", workBreak, "for contract:", createdContractId);
            const workBreakError = await postWorkBreakModel(workBreak, createdContractId);
            if (workBreakError) {
                throw new Error("Falha ao criar intervalo de trabalho");
            }

            // Se chegou até aqui, tudo deu certo
            return res.status(201).json({
                message: "Contrato completo criado com sucesso",
                data: {
                    employeeId: createdEmployeeId,
                    contractId: createdContractId,
                    addressId: createdAddressId
                }
            });

        } catch (transactionError) {
            // Em caso de erro, idealmente reverteríamos as operações já realizadas
            // Como não temos transações reais no Supabase aqui, apenas logamos o erro
            console.error("Erro durante a criação do contrato completo:", transactionError);
            
            // TODO: Implementar rollback manual se necessário
            // Por exemplo, deletar registros já criados
            
            return res.status(500).json({
                message: "Erro interno durante a criação do contrato",
                error: transactionError.message
            });
        }

    } catch (err) {
        console.error("Erro no postCompleteContractController:", err);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};

export default postCompleteContractController;
