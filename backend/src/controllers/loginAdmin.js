import findAdminByEmail from "../models/findAdminByEmail.js";
import verifyPassword from "../middlewares/verifyPassword.js";
import createToken from "../middlewares/createToken.js";

const loginAdmin = async (req, res) => {
    try{
        const {email, password} = req.body;

        const admin = await findAdminByEmail(email);
        if (admin && await verifyPassword(password, admin.password)){
            return res.status(200).json({
                message: "login has been verified",
                token: createToken(admin),
                valid: true
            });
        }
        return res.status(401).json({
            message: "invalid credentials",
            valid: false
        })
    }
    catch(err){
        console.error("error in loginAdmin controller:", err);
        throw err;
    }
}
export default loginAdmin;