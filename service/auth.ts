import { credentials } from "@/types/types"
import axios from "axios"


export const loginUser = async (credentials: credentials) => {
    const response = await axios.post('/api/auth/login', credentials)
    return response.data
}