import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from "../config/env.js";
import twilio from "twilio";

const clientTwilio = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export default clientTwilio;