import fetchEmployees from "../../models/Employees/fetchEmployees.js";

const getEmployees = async (req, res) => {

    try{
        const data = await fetchEmployees();
        if (data){
            return res.status(200).json(data)
        }
        else{
            return res.status(404).json({message: "not found employees"})
        }
    }
    catch(err){
        console.log("error in getEmployess controller:", err);
        throw err;
    }
}

export default getEmployees;