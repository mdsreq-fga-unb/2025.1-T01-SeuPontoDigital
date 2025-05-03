import bcrypt from "bcrypt";

const verifyPassword = async (loginPassword, storedPassword) => {
    try {
        const isMatch = await bcrypt.compare(loginPassword, storedPassword);

        if (isMatch)
            return true;
        else
            return false;
    }
    catch (err) {
        console.error("error in verifyPassword service:", err);
        throw err;
    }
}

export default verifyPassword;