import axios from '../api/axios'
import useAuth from './useAuth'
import { REFRESH_URL } from '../constants/apiConstants.jsx'

/**
 * Request new set of tokens and saves them to context
 * @returns {function(): Promise<{access: any, refresh: any}>}
 */
const useRefreshToken = () => {
  const { auth, setAuth } = useAuth()

  return async () => {
    const response = await axios.get(REFRESH_URL, {
      headers: { Authorization: `Bearer ${auth.refresh}` },
      withCredentials: true
    })

    const access = response?.data?.access
    const refresh = response?.data?.refresh

    setAuth(oldAuth => {
      return { ...oldAuth, access, refresh }
    })
    return { access, refresh }
  }
}

export default useRefreshToken
