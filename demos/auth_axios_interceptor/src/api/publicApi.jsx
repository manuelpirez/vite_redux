import axios from 'axios'
import { GET_ANON_TOKEN } from '../assets/endpoints.json'

const BASE_URL = 'http://localhost:3000'

// no interceptors
const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', test: 'api' },
  withCredentials: true
})

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

export const getAnonToken = () => {
  return api.get(GET_ANON_TOKEN)
}

export default publicApi
