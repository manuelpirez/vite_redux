import { apiRequest, getAnonToken } from '../api/axios'
import { useEffect } from 'react'
import useAuth from './useAuth'

/**
 * Check if there's an available token prior to request
 * if not, requests and adds an anon token to the initial request
 * @returns {AxiosInstance}
 */
const useApiRequest = () => {
  const { auth, setAuth } = useAuth()

  useEffect(() => {
    const requestIntercept = apiRequest.interceptors.request.use(
      async config => {
        if (auth?.access) {
          config.headers['Authorization'] = `Bearer ${auth.access}`
        } else {
          const anontoken = await getAnonToken()
          const access = anontoken?.data?.access
          const refresh = anontoken?.data?.refresh
          const roles = anontoken?.data?.roleId

          setAuth({ access, roles, refresh })

          config.headers['Authorization'] = `Bearer ${access}`
        }

        return config
      },
      error => {
        console.error(error)
        return Promise.reject(error)
      }
    )
    return () => {
      apiRequest.interceptors.request.eject(requestIntercept)
    }
  }, [])

  return apiRequest
}

export default useApiRequest
