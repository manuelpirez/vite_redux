import { apiRequest } from '../../api/axios.jsx'
import { useEffect } from 'react'
import useAuth from '../useAuth.jsx'
import useRefreshToken from '../useRefreshToken.jsx'

/**
 * Check if token is valid
 * if not, try to refresh and add new token
 * @returns {AxiosInstance}
 */
const useApiPrivate = () => {
  const { auth } = useAuth()
  const refresh = useRefreshToken()

  useEffect(() => {
    // ADD ACCESS TOKEN TO HEADER
    const requestIntercept = apiRequest.interceptors.request.use(
      async config => {
        config.headers['Authorization'] = `Bearer ${auth.access}`
        config.headers.authorized = 'INTERCEPTOR'
        return config
      },
      error => {
        console.error(error)
        return Promise.reject(error)
      }
    )

    // response intercept
    const responseIntercept = apiRequest.interceptors.response.use(
      response => {
        console.log('RESPONSE INTERCEPTOR')
        console.log({ response })
        return response
      },
      async error => {
        console.log(error)

        const prevRequest = error?.config
        // check for unauthorized and request not sent to avoid loop
        //if (error?.response?.status === 403 && !prevRequest?.sent) {
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true

          const newToken = await refresh()

          prevRequest.headers['Authorization'] = `Bearer ${newToken.refresh}`
          prevRequest.headers.authorized = 'REFRESHED'
          return apiRequest(prevRequest)
        }
        return Promise.reject(error)
      }
    )
    return () => {
      apiRequest.interceptors.request.eject(requestIntercept)
      apiRequest.interceptors.response.eject(responseIntercept)
    }
  }, [])

  return apiRequest
}

export default useApiPrivate
