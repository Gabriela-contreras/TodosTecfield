import axios from "axios"

const API_URL = "http://localhost:4000/api/tasks"

export const getTasks = async () => {
  const response = await axios.get(API_URL)
  console.log(response.data)
  return response.data
}