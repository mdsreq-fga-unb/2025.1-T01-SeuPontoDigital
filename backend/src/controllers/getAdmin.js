import findAdminByEmail from "../models/findAdminByEmail.js";
import verifyPassword from "../services/verifyPassword.js";
import createToken from "../middlewares/createToken.js";

const getAdmin = async (req, res) => {
    try{
        const {email, password} = req.body;

        const admin = await findAdminByEmail(email);
        if (admin && await verifyPassword(password, admin.password)){
            res.status(200).json({
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
        console.error("error in getAdmin controller:", err);
        throw err;
    }
}
export default getAdmin;