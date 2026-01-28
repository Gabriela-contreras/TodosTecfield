import axios from "axios"

const API_URL = "http://localhost:4000/api/tasks"

export const updateTaskService = async (id)=>{
    const response = await axios.put(`${API_URL}/${id}`, { status: "completada" } )
    console.log(response.data)
    return response.data
}