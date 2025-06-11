import getOneEmployerModel from "../models/Employers/getOneEmployerModel.js";
import getOneEmployeeModel from "../models/Employees/getOneEmployeeModel.js";
import getOneContractModel from "../models/ContractEmployee/getOneContractModel.js";

const validateDateTwoYearsEmployer = async (req, res, next) => {
    try {
        const employerID = req.params.id;
        const employer = await getOneEmployerModel(employerID);

        if (!employer) {
            return res.status(404).send({ message: "employer not found" });
        }
        
        const dateCreatedEmployer = new Date(employer.created_at);
        const dateNow = new Date();
        const twoYearsInMilliseconds = 2 * 365.5 * 24 * 60 * 60 * 1000;

        if ((dateNow.getTime() - dateCreatedEmployer.getTime()) > twoYearsInMilliseconds) {
            req.id = employerID;
            next(); 
        } 
        else {
            return res.status(403).send({ message: "employer created less than 2 years ago" });
        }
    } catch (error) {
        return res.status(500).send({ message: "internal server error"});
    }
}

const validateDateTwoYearsEmployee = async (req, res, next) => {
    try {
        const employeeID = req.params.id;
        const employee = await getOneEmployeeModel(employeeID);

        if (!employee) {
            return res.status(404).send({ message: "employee not found" });
        }
        
        const dateCreatedEmployee = new Date(employee.created_at);
        const dateNow = new Date();
        const twoYearsInMilliseconds = 2 * 365.5 * 24 * 60 * 60 * 1000;

        if ((dateNow.getTime() - dateCreatedEmployee.getTime()) > twoYearsInMilliseconds) {
            req.id = employeeID;
            next(); 
        } 
        else {
            return res.status(403).send({ message: "employee created less than 2 years ago" });
        }
    } catch (error) {
        return res.status(500).send({ message: "internal server error"});
    }
}

const validateDateTwoYearsContract = async (req, res, next) => {
    try {
        const contractID = req.params.id;
        const contract = await getOneContractModel(contractID);

        if (!contract) {
            return res.status(404).send({ message: "contract not found" });
        }
        
        const dateCreatedContract = new Date(contract.contract_start_date);
        const dateNow = new Date();
        const twoYearsInMilliseconds = 2 * 365.5 * 24 * 60 * 60 * 1000;

        if ((dateNow.getTime() - dateCreatedContract.getTime()) > twoYearsInMilliseconds) {
            req.id = contractID;
            next(); 
        } 
        else {
            return res.status(403).send({ message: "contract created less than 2 years ago" });
        }
    } catch (error) {
        return res.status(500).send({ message: "internal server error" });
    }
}

export { validateDateTwoYearsEmployer, validateDateTwoYearsEmployee, validateDateTwoYearsContract };