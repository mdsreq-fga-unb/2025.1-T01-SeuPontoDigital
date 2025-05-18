import bcrypt from "bcrypt";

const generatePasswordHash = async (password) => {
    try{
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    }
    catch(err){
        console.error("error generating password hash");
        return null;
    }
}

export default generatePasswordHash;
