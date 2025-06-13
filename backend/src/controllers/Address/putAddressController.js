import putAddressModel from "../../models/Address/putAddressModel.js";

const putAddressController = async (req, res) => {
    try {
        const addressID = req.params.id;
        const addressData = req.body;

        const error = await putAddressModel(addressID, addressData);
        
        if (error) {
            return res.status(500).json({ message: "failed to update address" });
        }

        return res.status(200).json({ message: "address updated successfully" });
    } catch (err) {
        return res.status(500).json({ message: "internal server error" });
    }
}

export default putAddressController;
