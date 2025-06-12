import verifyPassword from "../../middlewares/verifyPassword.js";
import createToken from "../../middlewares/createToken.js";
import getOneUserFromCPF from "../../models/LoginApp/getOneUserFromCPF.js";

const loginApp = async (req, res) => {
    try {
        const { cpf, password } = req.body;

        const { data, error, userType } = await getOneUserFromCPF(cpf)

        if (error || !data) {
            return res.status(404).send({ message: "CPF not found" });
        }

        const valid = await verifyPassword(password, data.password);
        if (!valid) {
            return res.status(401).json({ message: data.password, password});
        }

        return res.status(200).json({
            message: "You have successfully logged in",
            token: createToken(data),
            userType: userType
        });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "Internal Server Error" });
    }
};
export default loginApp;