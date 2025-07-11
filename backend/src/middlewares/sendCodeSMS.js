import { TWILIO_VERIFY_SERVICE_ID } from "../config/env.js";
import clientTwilio from "../config/twilio.js";

const sendCodeSMS = async (phone) => {
  try {
    const verification = await clientTwilio.verify.v2
      .services(TWILIO_VERIFY_SERVICE_ID)
      .verifications
      .create({ to: phone, channel: 'sms' });

    return verification;

  } catch (error) {
    console.error('Erro ao enviar SMS:', error);
    throw new Error('Falha ao enviar código SMS.');
  }
}

export default sendCodeSMS;