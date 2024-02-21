import axios from 'axios'
import {
  ANON_URL,
  FEEDBACK_URL,
  REFRESH_URL,
  TOKEN_VERIFY
} from '../constants/apiConstants.jsx'
//import useAuth from "../hooks/useAuth.jsx";

const BASE_URL = 'http://localhost:5000'

// no interceptors
const api = axios.create({
  baseURL: BASE_URL,
  headers: { test: 'api' }
})
// with credentials true / post
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', test: 'axiosPrivate' },
  withCredentials: true
})
// generate anon if no token available
export const apiRequest = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', test: 'apiRequest' },
  withCredentials: true
})

// Request interceptor for adding the bearer token from localstorage
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
//         console.log('INTERCEPTOR')
//         console.log({config})
//         console.log({token})
//         console.log('INTERCEPTOR')
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//        return Promise.reject(error);
//    }
// );
axiosPrivate.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token') // Assuming you store the token in localStorage
    console.log('PRIVATE INTERCEPTOR')
    console.log({ config })
    console.log({ token })
    console.log('PRIVATE INTERCEPTOR')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//apiRequest.interceptors.request.use(
//    (config) => {
//        return config;
//    },
//    (error) => {
//        return Promise.reject(error);
//    }
//);

// API Service
export const tokenRefresh = ({ access }) => {
  return api.post(REFRESH_URL, JSON.stringify({ access }))
}
export const tokenLogin = ({ access }) => {
  return api.post(TOKEN_VERIFY, JSON.stringify({ access }))
}
export const login = ({ user, pwd }) => {
  return api.post(TOKEN_VERIFY, JSON.stringify({ user, pwd }))
}

// FORMS
export const feedback = async feedback => {
  return await apiRequest.post(FEEDBACK_URL, { feedback })
}
export const getAnonToken = async () => {
  return await api.get(ANON_URL)
}

export default api
