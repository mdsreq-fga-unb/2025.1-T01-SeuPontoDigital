import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_ID } from "../config/env.js";
import twilio from "twilio";

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendSMS = async (phone) => {
  try {
    const verification = await client.verify.v2
      .services(TWILIO_VERIFY_SERVICE_ID)
      .verifications
      .create({ to: phone, channel: 'sms' });

    return verification;
  } catch (error) {
    console.error('Erro ao enviar SMS:', error);
    throw new Error('Falha ao enviar código SMS.');
  }
};

export default sendSMS;