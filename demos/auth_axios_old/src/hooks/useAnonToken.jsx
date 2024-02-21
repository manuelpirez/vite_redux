import axios from '../api/axios'
import useAuth from './useAuth.jsx'
import { ANON_URL } from '../constants/apiConstants.jsx'

const useAnonToken = () => {
  const { setAuth } = useAuth()

  return async () => {
    const response = await axios.get(ANON_URL)
    const access = response?.data?.access
    const refresh = response?.data?.refresh
    const roles = response?.data?.roleId

    localStorage.setItem('token', JSON.stringify(response.data))
    setAuth({ access, roles, refresh })
    return { access, refresh, roles }
  }
}

export default useAnonToken
