import { body, validationResult } from "express-validator";

const validateEmployer = [
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
        .customSanitizer(value => value.replace(/\D/g, ''))
        .notEmpty().withMessage("phone is required")
        .matches(/^\d{10,15}$/).withMessage("phone must contain 10 to 15 digits numbers only"),

    body("email")
        .trim()
        .notEmpty().withMessage("email is required")
        .isEmail().withMessage("email is not valid")
        .custom(value => {
            return value.replace(/\s+/g, '').trim();
        }),

    body("cpf")
        .trim()
        .notEmpty().withMessage("cpf is required")
        .customSanitizer(value => value.replace(/\D/g, ''))
        .matches(/^\d{11}$/).withMessage("cpf must contain exactly 11 digits"),

    // Validações de endereço
    body("cep")
        .trim()
        .notEmpty().withMessage("cep is required")
        .customSanitizer(value => value.replace(/\D/g, ''))
        .matches(/^\d{8}$/).withMessage("cep must contain exactly 8 digits"),

    body("street")
        .trim()
        .notEmpty().withMessage("street is required")
        .isLength({ min: 5, max: 100 }).withMessage("street must be between 5 and 100 characters"),

    body("house_number")
        .trim()
        .notEmpty().withMessage("house_number is required"),

    body("city")
        .trim()
        .notEmpty().withMessage("city is required")
        .isLength({ min: 2, max: 50 }).withMessage("city must be between 2 and 50 characters"),

    body("uf")
        .trim()
        .notEmpty().withMessage("uf is required")
        .matches(/^[A-Z]{2}$/).withMessage("uf must be exactly 2 uppercase letters"),

    body("neighborhood")
        .trim()
        .notEmpty().withMessage("neighborhood is required")
        .isLength({ min: 2, max: 50 }).withMessage("neighborhood must be between 2 and 50 characters"),

    body("complement")
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage("complement must be at most 100 characters"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages = errors.array().map(err => err.msg);
            return res.status(400).json({ errors: messages });
        }
        next();
    }
];

export default validateEmployer;
