import { body, validationResult } from "express-validator";

const validateContract = [
    body("employer_id")
        .notEmpty().withMessage("Employer ID is required"),

    body("work_schedule_type")
        .isIn(["fixa","variavel"]).withMessage("work_schedule_type is not valid"),

    body("break_interval")
        .matches(/^([0-1]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/)
        .withMessage("break_interval is not valid")
        .customSanitizer(value => {
        return value.split(":").slice(0, 2).join(":");
    }),

    body("work_days")
        .isArray().withMessage("work days are not valid")
        .custom((workDays, {req}) => {
            const validDays = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];

            const breakInterval = req.body.break_interval;
            const [breakHour, breakMinute] = breakInterval.split(":").map(Number);
            const breakTotalMinutes = breakHour * 60 + breakMinute;
            
            let totalWeeklyMinutes = 0;

            workDays.forEach(day => {
                if (!validDays.includes(day.day)) throw new Error("work day is not valid");
                if (!day.start.match(/^([0-1]\d|2[0-3]):([0-5]\d)$/)) throw new Error("start is not valid");
                if (!day.end.match(/^([0-1]\d|2[0-3]):([0-5]\d)$/)) throw new Error("end is not valid");

                const [startHour, startMinute] = day.start.split(":").map(Number);
                const [endHour, endMinute] = day.end.split(":").map(Number);
                
                const startTotalMinutes = startHour * 60 + startMinute;
                const endTotalMinutes = endHour * 60 + endMinute;
                const workedMinutes = endHour > startHour
                        ? endTotalMinutes - startTotalMinutes - breakTotalMinutes
                        : 24 * 60 - startTotalMinutes + endTotalMinutes - breakTotalMinutes;                
                
                if (workedMinutes < 240) {
                    throw new Error(`Insufficient worked hours on '${day.day}'. A minimum of 4 hours is required.`);
                }

                if (workedMinutes > 528) {
                    throw new Error(`worked hours on ${day.day} exceed the maximum allowed`);
                }

                if (workedMinutes <= 360 && breakTotalMinutes !== 15) {
                    throw new Error("For shifts lasting up to 6 hours, the break duration must be exactly 15 minutes.");
                } else if (workedMinutes > 360 && workedMinutes <= 528 && (breakTotalMinutes < 60 || breakTotalMinutes > 120)) {
                    throw new Error("For shifts exceeding 6 hours, the break must be between 1 and 2 hours.");
                }

                totalWeeklyMinutes += workedMinutes;
            });

            const totalWeeklyHours = totalWeeklyMinutes / 60;
            if (totalWeeklyHours > 44){
                throw new Error("Total weekly hours exceed the limit of 44 hours.");
            }

            return true;
        }),

    body("salary")
        .isNumeric().withMessage("salary is not valid")
        .isFloat({ min: 0 }).withMessage("salary is not valid"),

    body("app_access")
        .toBoolean()
        .isBoolean().withMessage("app_access is not valid"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const messages = errors.array().map(err => err.msg);
            return res.status(400).json({ errors: messages });
        }
        next();
    }
];

export default validateContract;
