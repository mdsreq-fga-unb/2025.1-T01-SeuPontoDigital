import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./src/config/env.js";

// Simular um token válido
const mockUserId = "66aac295-cbd8-4013-bfd1-ced256bf3b01";
const mockUserEmail = "test@example.com";

const token = jwt.sign(
  { id: mockUserId, email: mockUserEmail },
  JWT_SECRET,
  { expiresIn: '24h' }
);

console.log('Token gerado:', token);

// Simular a validação do token
try {
  const decoded = jwt.verify(token, JWT_SECRET);
  console.log('Token decodificado:', decoded);
  console.log('ID do usuário:', decoded.id);
} catch (error) {
  console.error('Erro ao decodificar token:', error);
} 