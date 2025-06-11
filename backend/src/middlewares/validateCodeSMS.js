import { TWILIO_VERIFY_SERVICE_ID } from "../config/env.js";
import clientTwilio from "../config/twilio.js";

const validateCodeSMS = async (phone, code) => {
    try {
        const verificationCheck = await clientTwilio.verify.v2
            .services(TWILIO_VERIFY_SERVICE_ID)
            .verificationChecks
            .create({ to: phone, code });

        return verificationCheck.status === 'approved';
    } 
    catch (error) {
        throw new Error('failed in code verification');
    }
}

export default validateCodeSMS;