import { body, validationResult } from "express-validator";

const validateContract = [
    body("salary")
        .isNumeric().withMessage("salary is not valid")
        .isFloat({ min: 0 }).withMessage("salary is not valid"),

    body("access_app")
        .toBoolean()
        .isBoolean().withMessage("access_app is not valid"),
    
    body("status")
        .toBoolean()
        .isBoolean().withMessage("status is not valid"),
    
    body("start_date")
        .isISO8601().withMessage("start_date is not a valid date")
        .custom((value) => {
            const date = new Date(value);
            if (isNaN(date.getTime())) throw new Error("start_date is not a valid calendar date");
            const [year, month, day] = value.split("-");
            if (
                date.getUTCFullYear() !== Number(year) ||
                date.getUTCMonth() + 1 !== Number(month) ||
                date.getUTCDate() !== Number(day)
            ) {
                throw new Error("start_date is not a valid calendar date");
            }
            return true;
        }),

    body("function")
        .isString().withMessage("function must be a string"),

    body("end_date")
        .optional({ nullable: true })
        .custom((value) => {
            if (value === null || value === undefined || value === "") return true;
            if (typeof value !== "string") throw new Error("end_date must be a string or null");
            if (!/^\d{4}-\d{2}-\d{2}/.test(value)) throw new Error("end_date is not a valid date");
            const date = new Date(value);
            const [year, month, day] = value.split("-");
            if (
                isNaN(date.getTime()) ||
                date.getUTCFullYear() !== Number(year) ||
                date.getUTCMonth() + 1 !== Number(month) ||
                date.getUTCDate() !== Number(day)
            ) {
                throw new Error("end_date is not a valid calendar date");
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages = errors.array().map(err => err.msg);
            return res.status(400).json({ errors: messages });
        }
        next();
    }
]

export default validateContract;