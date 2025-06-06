import bcrypt from "bcrypt";

const verifyPassword = async (loginPassword, storedPassword) => {
    try {
        const isMatch = await bcrypt.compare(loginPassword, storedPassword);
        
        if (isMatch) return true;
            
        else return false;        
    }
    catch (err) {
        console.error("an error occurred while verifying the password hash");
        throw err;
    }
}

export default verifyPassword;