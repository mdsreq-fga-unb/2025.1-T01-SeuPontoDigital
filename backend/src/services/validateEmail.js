import { body, validationResult } from "express-validator";

const validateEmail = [
    body("email").isEmail().withMessage("email is not valid"),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()[0].msg});
        }
        next();
    }
];

export default validateEmail;