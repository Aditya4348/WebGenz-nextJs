import { credentials, regisCredentials } from "@/types/types"
import axios from "axios"


export const getUser = async () => {
    const response = await axios.get('/api/auth/me')
    return response.data.data
}


export const loginUser = async (credentials: credentials) => {
    const response = await axios.post('/api/auth/login', credentials)
    return response.data
}

export const registerUser = async (credentials: regisCredentials) => {
    const response = await axios.post('/api/auth/regis', credentials)
    return response.data
}