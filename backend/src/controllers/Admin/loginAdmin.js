import findAdminByEmail from "../../models/Admin/findAdminByEmail.js";
import validateHashPasswordEqual from "../../middlewares/validateHashPasswordEqual.js";
import generateToken from "../../middlewares/generateToken.js";

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await findAdminByEmail(email);

        if (!admin) return res.status(404).send({message: "email not found"});

        if (admin && await validateHashPasswordEqual(password, admin.password)) {
            return res.status(200).json({
                message: "login has been verified",
                token: generateToken(admin),
            });
        }

        return res.status(401).json({message: "invalid credentials"});
    }
    catch (err) {
        return res.status(500).send({message: "internal server error"});
    }
}
export default loginAdmin;