import bcrypt from "bcrypt";

const senha = await bcrypt.hash("1234567", 10);

console.log(senha)