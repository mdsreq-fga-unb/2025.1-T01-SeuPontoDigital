import verifySMS from "../../middlewares/verifySMS.js";

const verifyCodeController = async (req, res) => {
  const { phone, code } = req.body;

  if (!phone || !code) {
    return res.status(400).send({ message: "Telefone e código são obrigatórios." });
  }

  try {
    const isValid = await verifySMS(phone, code);

    if (isValid) {
      return res.status(200).send({ message: "success" });
    } else {
      return res.status(400).send({ message: "failed" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export default verifyCodeController;
