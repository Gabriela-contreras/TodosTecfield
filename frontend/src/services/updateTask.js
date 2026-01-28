import axios from "axios"

const API_URL = "http://localhost:4000/api/tasks"

export const updateTaskService = async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data)
    return response.data
}