import Notification from "../components/Notification";

const handleError = (data) => {

    if (data === "invalid cpf" || data === 'duplicate key value violates unique constraint "user_cpf_key"')
        return Notification.error("O CPF digitado é inválido. Tente novamente!")

    if (Array.isArray(data) && data.some((error) => error.includes("name must contain")))
        return Notification.error("O nome digitado é muito curto. Tente novamente!")

    if (Array.isArray(data) &&  data.some((error) => error.includes("email is not valid")))
        return Notification.error("O email digitado não é válido. Tente novamente!")

    if (Array.isArray(data) && data.some((error) => error.includes("phone must contain")))
        return Notification.error("O número de telefone digitado não é válido. Tente novamente!")

    if (Array.isArray(data) && data.some((error) => error.includes("nacionality must contain")))
        return Notification.error("A nacionalidade digitada não é válida. Tente novamente!")
    
    if (Array.isArray(data) && data.some((error) => error.includes("marital status must be one")))
        return Notification.error("O estado civil digitado não é válido. Tente novamente!")

    if (Array.isArray(data) && data.some((error) => error.includes("occupation must contain only")))
        return Notification.error("A profissão digitada não é válida. Tente novamente!")

    if (Array.isArray(data) && data.some((error) => error.includes("rg must be between")))
        return Notification.error("O RG digitado não é válido. Tente novamente!")

    return Notification.error("Erro interno do servidor. Tente novamente mais tarde!")
}

export default handleError;
