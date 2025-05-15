import findEmployeeByEmail from "../models/findEmployeeByEmail.js";
import verifyPassword from "../middlewares/verifyPassword.js";
import createTokenMobile from "../middlewares/createTokenMobile.js";

const loginMobile = async (req, res) => {
    try {
        const { email, password } = req.body;

        const employee = await findEmployeeByEmail(email);
        if (employee && await verifyPassword(password, employee.password)) {
            return res.status(200).json({
                message: "login has been verified",
                token: createTokenMobile(employee),
            });
        }
        return res.status(401).json({message: "invalid credentials"})
    }
    catch (err) {
        return res.status(500).send(err);
    }
}
export default loginMobile;