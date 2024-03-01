import axios from "axios"

export const getAllTasks = async(filterCardByDuration) => {
    try {
        const token = localStorage.getItem('token')
        
        if(token) {
            const header = { headers : {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token
            }}
            const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/tasks/all?filter=${filterCardByDuration ? filterCardByDuration : '' }`, header);
            if(data.status === "SUCCESS") {
                return data;
        }  
       }else {
        throw new Error("Something Unexpected Happened")
       }
    } catch (error) {
        const customErrorMessage = error?.response?.data?.status === "ERROR" ? error?.response?.data?.message :"Something Went Wrong";
        throw new Error(customErrorMessage);
    }
}

export const updateExistingCard = async(cardId, value) => {
    try {
        const token = localStorage.getItem('token')
        if(token) {
            const header = { headers : {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token
            }}
            const { data } = await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/tasks/update/${cardId}`, value, header);
            return data;
        
    }} catch (error) {
        const customErrorMessage = error?.response?.data?.message || "Something Went Wrong";
        throw new Error(customErrorMessage);
    }
  
}


export const updateTaskState = async(cardId, data) => {
    try {
        const token = localStorage.getItem('token')
        const reqPayload = { checklist: data}
        if(token) {
            const header = { headers : {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token
            }}
            const { data } = await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/tasks/update/${cardId}`, reqPayload, header);
                return data;
       }else {
        throw new Error("Something Unexpected Happened")
       }
    } catch (error) {
        const customErrorMessage = error?.response?.data?.message || "Something Went Wrong";
        throw new Error(`errorrrr ${customErrorMessage}`);
    }
}

export const updateCardCategory = async(cardId, data) => {
    try {
        const token = localStorage.getItem('token')
        const reqPayload = { category: data}
        if(token) {
            const header = { headers : {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token
            }}
            const { data } = await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/tasks/update/${cardId}`, reqPayload, header);
                return data;
       }else {
        throw new Error("Something Unexpected Happened")
       }
    } catch (error) {
        const customErrorMessage = error?.response?.data?.message || "Something Went Wrong";
        throw new Error(`errorrrr ${customErrorMessage}`);
    }

}

export const getAllAnalytics = async() => {
    try {
        const token = localStorage.getItem('token')
        if(token) {
            const header = { headers : {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token
            }}
            const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/tasks/analytics`,  header);
                return data;
       }else {
        throw new Error("Something Unexpected Happened")
       }
    } catch (error) {
        const customErrorMessage = error?.response?.data?.message || "Something Went Wrong";
        throw new Error(`errorrrr ${customErrorMessage}`);
    }

}


export const createTask = async(value) => {
    try {
        const token = localStorage.getItem('token')
        if(token) {
            const header = { headers : {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token
            }}
            const { data } = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/tasks/create`, value, header);
            return data;
        
    }} catch (error) {
        const customErrorMessage = error?.response?.data?.message || "Something Went Wrong";
        throw new Error(customErrorMessage);
    }
}

export const deleteTaskCard = async(cardId) => {
    try {
        const token = localStorage.getItem('token')
        if(token) {
            const header = { headers : {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token
            }}
            const { data } = await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/tasks/${cardId}`, header);
            return data;
    } }catch (error) {
        const customErrorMessage = error?.response?.data?.message || "Something Went Wrong";
        throw new Error(customErrorMessage);
    }
}

export const getTaskById = async(cardId) => {
    try {
        if(cardId){
            const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/tasks/${cardId}`);
            return data;
        }
        else {
        throw new Error("Invalid Card Id");
        }
    } catch (error) {
        const customErrorMessage = error?.response?.data?.message || "Something Went Wrong";
        throw new Error(customErrorMessage);
    }
}