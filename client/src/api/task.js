import axios from "axios"

export const getAllTasks = async() => {
    try {
        const token = localStorage.getItem('token')
        if(token) {
            const header = { headers : {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token
            }}
            const { data } = await axios.get("http://localhost:8000/api/v1/tasks/all", header);
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

export const updateExistingCard = async(cardId, data) => {
    try {
        console.log("cardId : "+ cardId)
        console.log("data : "+ data)

    } catch (error) {
        
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
            const { data } = await axios.put(`http://localhost:8000/api/v1/tasks/update/${cardId}`, reqPayload, header);
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
            const { data } = await axios.put(`http://localhost:8000/api/v1/tasks/update/${cardId}`, reqPayload, header);
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
            const { data } = await axios.get(`http://localhost:8000/api/v1/tasks/analytics`,  header);
                return data;
       }else {
        throw new Error("Something Unexpected Happened")
       }
    } catch (error) {
        const customErrorMessage = error?.response?.data?.message || "Something Went Wrong";
        throw new Error(`errorrrr ${customErrorMessage}`);
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
            const { data } = await axios.patch(`http://localhost:8000/api/v1/updateuser`, formData, header);
                return data;
       }else {
        throw new Error("Something Unexpected Happened")
       }
    } catch (error) {
        const customErrorMessage = error?.response?.data?.message || "Something Went Wrong";
        throw new Error(customErrorMessage);
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
            const { data } = await axios.post(`http://localhost:8000/api/v1/tasks/create`, value, header);
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
            const { data } = await axios.delete(`http://localhost:8000/api/v1/tasks/${cardId}`, header);
            return data;
    } }catch (error) {
        const customErrorMessage = error?.response?.data?.message || "Something Went Wrong";
        throw new Error(customErrorMessage);
    }
}