import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_ID } from "../config/env.js";
import twilio from "twilio";

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const verifySMS = async (phone, code) => {
    try {
        const verificationCheck = await client.verify.v2
            .services(TWILIO_VERIFY_SERVICE_ID)
            .verificationChecks
            .create({ to: phone, code });

        return verificationCheck.status === 'approved';
    } 
    catch (error) {
        throw new Error('failed in code verification');
    }
};

export default verifySMS;