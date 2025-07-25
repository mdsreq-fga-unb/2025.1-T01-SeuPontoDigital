import postAddressModel from "../../models/Address/postAddressModel.js";

const postAddressController = async (req, res) => {
    const address = req.body
    try {
        const id = await postAddressModel(address);

        if (!id) {
            return res.status(500).send({ message: "internal server error on postAddressController" })
        }

        return res.status(200).json({
                message: "the address was entered successfully",
                id_address: id,
            });
    }
    catch (err) {
        return res.status(500).send({ message: "internal server error" })
    }
}

export default postAddressController;