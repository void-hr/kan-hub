import axios from "axios";
import toast from "react-hot-toast";
export const registerAccount = async(value) => {

    try {
        const  { name, email, password}   = value
        const reqPayload = { name, email, password}
        const {data}  = await axios.post("http://localhost:8000/api/v1/register", reqPayload);
        console.log("first")
       if(data.status === "SUCCESS") {
        toast.success(`${data.message}`)
           return data;
       }
    } catch (error) {
        const customErrorMessage = error.response.data?.message;
        throw new Error(`${customErrorMessage}`);
    }
}