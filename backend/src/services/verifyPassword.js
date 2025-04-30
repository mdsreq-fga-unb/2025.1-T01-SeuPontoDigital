import bcrypt from "bcrypt";

const verifyPassword = async (loginPassword, storedPassword) =>{
    try {
        const isMatch = await bcrypt.compare(loginPassword, storedPassword);

        if (isMatch) return true;
        return false;
    }
    catch(err){
        console.error("error in verify password", err);
        throw err;
    }   
}

export default verifyPassword;