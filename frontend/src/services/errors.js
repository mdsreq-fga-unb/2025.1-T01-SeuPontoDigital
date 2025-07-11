import Notification from "../components/Notification";

const handleError = (data) => {

    console.log(`Error: ${data}`)

    if (data === "invalid cpf")
        return Notification.error("O CPF digitado é inválido. Tente novamente!")

    if (data === 'duplicate key value violates unique constraint "user_cpf_key"')
        return Notification.error("O CPF digitado já está em uso. Tente novamente!")

    if (data === "invalid password")
        return Notification.error("Senha incorreta. Tente novamente!")

    if (data === "employer created less than 2 years ago")
        return Notification.error("Não é possível excluir empregadores criados há menos de 2 anos!")

    if (data === "contract created less than 2 years ago")
        return Notification.error("Não é possível excluir contratos criados há menos de 2 anos!")

    if (Array.isArray(data) && data.some((error) => error.includes("name")))
        return Notification.error("O nome digitado não é válido. Tente novamente!")

    if (Array.isArray(data) &&  data.some((error) => error.includes("email")))
        return Notification.error("O email digitado não é válido. Tente novamente!")

    if (Array.isArray(data) && data.some((error) => error.includes("phone")))
        return Notification.error("O número de telefone digitado não é válido. Tente novamente!")

    if (Array.isArray(data) && data.some((error) => error.includes("job_function")))
        return Notification.error("A profissão digitada não é válida. Tente novamente!")

    if (Array.isArray(data) && data.some((error) => error.includes("Insufficient worked hours")))
        return Notification.error("As horas trabalhadas em um ou mais dias estão abaixo do mínimo permitido (4 horas).");

    if (Array.isArray(data) && data.some((error) => error.includes("exceed the maximum allowed")))
        return Notification.error("As horas trabalhadas em um ou mais dias excedem o limite máximo diário permitido de 8 horas e 48 minutos.");

    if (Array.isArray(data) && data.some((error) => error.includes("break duration must be exactly 15 minutes")))
        return Notification.error("Para jornadas de até 6 horas, o intervalo deve ser exatamente 15 minutos.");

    if (Array.isArray(data) && data.some((error) => error.includes("break must be between 30 minutes and 2 hours")))
        return Notification.error("Para jornadas acima de 6 horas, o intervalo deve estar entre 30 minutos e 2 horas.");

    if (Array.isArray(data) && data.some((error) => error.includes("exceeded weekly hours")))
       return Notification.error("O total de horas trabalhadas na semana ultrapassam o limite de 44 horas.");

    if(typeof data === "string" && data.includes("Geocoding request failed"))
        return Notification.error("O endereço digitado não é válido. Tente novamente!")

    return Notification.error("Erro interno do servidor. Tente novamente mais tarde!")
}

export default handleError;
