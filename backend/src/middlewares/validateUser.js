import { body, validationResult } from "express-validator";

const validMaritalStatuses = [
    "solteiro", "solteira",
    "casado", "casada",
    "divorciado", "divorciada",
    "viúvo", "viúva",
    "separado judicialmente", "separada judicialmente",
    "união estável", 
    "viuvo", "viuva",
    "uniao estavel"
];

const validateUser = [
    body("name")
        .trim()
        .notEmpty().withMessage("name is required")
        .custom(value => {
            const formattedName = value.replace(/\s+/g, ' ').trim();
            const parts = formattedName.split(" ");
            if (parts.length < 2) throw new Error("name must contain at least two words");
            if (formattedName.length < 6) throw new Error("each name must be bigger than 6");
            return formattedName;
        }),

    body("phone")
        .trim()
        .notEmpty().withMessage("phone is required")
        .matches(/^\+?\d{10,15}$/).withMessage("phone must contain 10 to 15 digits numbers only")
        .custom(value => {
            return value.replace(/\s+/g, '').trim();
        }),

    body("email")
        .notEmpty().withMessage("email is required")
        .isEmail().withMessage("email is not valid")
        .custom(value => {
            return value.replace(/\s+/g, '').trim();
        }),

    body("nationality")
        .trim()
        .notEmpty().withMessage("nationality is required")
        .matches(/^[A-Za-zÀ-ú\s]+$/).withMessage("nationality must contain only letters and spaces")
        .custom(value => {
            return value.replace(/\s+/g, ' ').trim();
        }),

    body("marital_status")
        .trim().toLowerCase()
        .notEmpty().withMessage("marital status is required")
        .isIn(validMaritalStatuses).withMessage(`marital status must be one of: ${validMaritalStatuses.join(", ")}`)
        .custom(value => {
            return value.replace(/\s+/g, ' ').trim();
        }),

    body("job_function")
        .trim()
        .notEmpty().withMessage("job_function is required")
        .isLength({ min: 2, max: 50 }).withMessage("job_function must be between 3 and 50 characters")
        .matches(/^[A-Za-zÀ-ú\s]+$/).withMessage("job_function must contain only letters and spaces")
        .custom(value => {
            return value.replace(/\s+/g, ' ').trim();
        }),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages = errors.array().map(err => err.msg);
            return res.status(400).json({ errors: messages });
        }
        next();
    }
];

export default validateUser;
