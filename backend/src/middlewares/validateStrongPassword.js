const validateStrongPassword = (req, res, next) => {
    const { password } = req.body;

    const regex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9\s]).{8,}$/;

    if (!password) {
        return res.status(400).send({ message: "Senha é obrigatória." });
    }

    if (!regex.test(password)) {
        return res.status(400).send({
            message: "A senha deve ter no mínimo 8 caracteres, ao menos uma letra maiúscula e um caractere especial (exceto espaço)."
        });
    }

    next();
};

export default validateStrongPassword;