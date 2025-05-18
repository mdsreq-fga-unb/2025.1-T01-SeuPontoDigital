import { body, validationResult } from "express-validator";

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
        .customSanitizer(value => value.replace(/\D/g, ''))
        .notEmpty().withMessage("phone is required")
        .matches(/^\d{10,15}$/).withMessage("phone must contain 10 to 15 digits numbers only"),

    body("email")
        .optional()
        .isEmail().withMessage("email is not valid")
        .custom(value => {
            return value.replace(/\s+/g, '').trim();
        }),

    body("job_function")
        .trim()
        .optional()
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
