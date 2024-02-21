import { tokenRefresh } from '../../api/auth.jsx'
import useAuth from '../useAuthContext.jsx'

/**
 * Request new set of tokens and saves them to context
 * @returns {function(): Promise<{access: string, refresh: string}>}
 */
const useRefreshToken = () => {
  const { auth, setAuth } = useAuth()
  console.log('REFRESHING TOKEN')
  console.log(auth)
  return async () => {
    const response = await tokenRefresh({ refresh: auth.refresh })

    const access = response?.data?.access
    const refresh = response?.data?.refresh

    setAuth(oldAuth => {
      return { ...oldAuth, access, refresh }
    })
    return { access, refresh }
  }
}

export default useRefreshToken
