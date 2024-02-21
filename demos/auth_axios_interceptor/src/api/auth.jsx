import axios from 'axios'
import { REFRESH_URL, TOKEN_VERIFY } from '../assets/endpoints.json'

const BASE_URL = 'http://localhost:3000'

// no interceptors
const auth = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', test: 'auth' },
  withCredentials: true
})

// API Service
export const tokenRefresh = ({ refresh }) => {
  return auth.post(REFRESH_URL, JSON.stringify({ refresh }))
}
export const tokenLogin = ({ access }) => {
  return auth.post(TOKEN_VERIFY, JSON.stringify({ access }))
}

export default auth
