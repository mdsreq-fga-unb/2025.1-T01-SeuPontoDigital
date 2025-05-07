import Notification from "../components/Notification";

const handleError = (data) => {

    if (data === "invalid cpf")
        return Notification.error("O CPF digitado é inválido. Tente novamente!")

    if (data === 'duplicate key value violates unique constraint "user_cpf_key"')
        return Notification.error("O CPF digitado já está em uso. Tente novamente!")

    if (Array.isArray(data) && data.some((error) => error.includes("name")))
        return Notification.error("O nome digitado não é válido. Tente novamente!")

    if (Array.isArray(data) &&  data.some((error) => error.includes("email")))
        return Notification.error("O email digitado não é válido. Tente novamente!")

    if (Array.isArray(data) && data.some((error) => error.includes("phone")))
        return Notification.error("O número de telefone digitado não é válido. Tente novamente!")

    if (Array.isArray(data) && data.some((error) => error.includes("nacionality")))
        return Notification.error("A nacionalidade digitada não é válida. Tente novamente!")
    
    if (Array.isArray(data) && data.some((error) => error.includes("marital status")))
        return Notification.error("O estado civil digitado não é válido. Tente novamente!")

    if (Array.isArray(data) && data.some((error) => error.includes("occupation")))
        return Notification.error("A profissão digitada não é válida. Tente novamente!")

    if (Array.isArray(data) && data.some((error) => error.includes("rg")))
        return Notification.error("O RG digitado não é válido. Tente novamente!")

    return Notification.error("Erro interno do servidor. Tente novamente mais tarde!")
}

export default handleError;
