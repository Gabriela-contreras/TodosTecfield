import axios from "axios"

const API_URL = "http://localhost:4000/api/tasks"

export const deleteTaskService = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}