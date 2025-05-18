import findAdminByEmail from "../../models/Admin/findAdminByEmail.js";
import verifyPassword from "../../middlewares/verifyPassword.js";
import createToken from "../../middlewares/createToken.js";

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await findAdminByEmail(email);

        if (!admin) return res.status(404).send({message: "email not found"});

        if (admin && await verifyPassword(password, admin.password)) {
            return res.status(200).json({
                message: "login has been verified",
                token: createToken(admin),
            });
        }

        return res.status(401).json({message: "invalid credentials"});
    }
    catch (err) {
        return res.status(500).send({message: "internal server error"});
    }
}
export default loginAdmin;