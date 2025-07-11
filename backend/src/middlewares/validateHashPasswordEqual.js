import bcrypt from "bcrypt";

const validateHashPasswordEqual = async (loginPassword, storedPassword) => {
    try {
        // Verificar se os parâmetros são válidos
        if (!loginPassword || !storedPassword) {
            console.error("Invalid parameters for password validation");
            return false;
        }

        const isMatch = await bcrypt.compare(loginPassword, storedPassword);
        
        return isMatch;
    }
    catch (err) {
        console.error("an error occurred while verifying the password hash:", err.message);
        return false; // Retornar false em caso de erro ao invés de throw
    }
}

export default validateHashPasswordEqual;