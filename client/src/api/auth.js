import axios from "axios";

export const registerAccount = async( value ) => {
    try {
        const  { name, email, password }  = value
        const reqPayload = { name, email, password}
        const { data }  = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/register`, reqPayload);
       if(data.status === "SUCCESS") {
           return data;
       }else {
        throw new Error("Something Unexpected Happened")
       }
    } catch (error) {
        const customErrorMessage = error?.response?.data?.message || "Something Went Wrong";
        throw new Error(customErrorMessage);
    }
}

export const loginAccount = async( value ) => {
    try {
        const  { email, password}  = value
        const reqPayload = { email, password}
        const { data }  = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/login`, reqPayload);
       if(data.status === "SUCCESS") {
           return data;
       }else {
        throw new Error("Something Unexpected Happened")
       }
    } catch (error) {
        const customErrorMessage = error?.response?.data?.message || "Something Went Wrong";
        throw new Error(`${customErrorMessage}`);
    }
}

export const updateSettings = async(formData) => {
    try {
        const token = localStorage.getItem('token')
        if(token) {
            const header = { headers : {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token
            }}
            const { data } = await axios.patch(`${import.meta.env.VITE_APP_BACKEND_URL}/updateuser`, formData, header);
                return data;
       }else {
        throw new Error("Something Unexpected Happened")
       }
    } catch (error) {
        const customErrorMessage = error?.response?.data?.message || "Something Went Wrong";
        throw new Error(customErrorMessage);
    }
}
