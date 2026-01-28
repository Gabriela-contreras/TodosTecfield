import axios from "axios"

const API_URL = "http://localhost:4000/api/tasks"

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task)
  return response.data
}
