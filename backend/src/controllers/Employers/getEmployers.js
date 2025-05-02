import getEmployersFromDB from "../../models/Employers/getEmployersfromDB.js";

const getEmployers = async (req, res) => {
    try{
        const {data, error} = await getEmployersFromDB();

        if (data) {
            console.log(data)
            return res.status(200).json(data)
        }
        else{
            console.log(error)
            if (error) return res.status(400).json({message: error.message})
            return res.status(404).json({message: "not found employers"})
        } 
    }
    catch(err){
        console.error("error in getEmployers controller:", err);
        throw err;
    }
}

export default getEmployers;