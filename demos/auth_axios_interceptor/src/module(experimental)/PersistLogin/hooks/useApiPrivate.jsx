import { useEffect } from 'react'

import useRefreshToken from './useRefreshToken.jsx'

import auth from '../api/auth.jsx'

/**
 * verify token and refresh if 403
 * @returns {AxiosInstance}
 */
const useApiPrivate = ({ auth: autContext, setAuth }) => {
  const refresh = useRefreshToken()

  useEffect(() => {
    // ADD ACCESS TOKEN TO HEADER
    const requestIntercept = auth.interceptors.request.use(
      async config => {
        // Modify the config object to include payload data
        // if (payload){

        //     config.data = {
        //         ...config.data,
        //         ...payload
        //     };
        // }

        config.headers['Authorization'] = `Bearer ${autContext.access}`
        config.headers.authorized = 'INTERCEPTOR'
        console.log({ config })
        return config
      },
      e => {
        console.error(e)
        console.error('REJECTING')
        return Promise.reject(e)
      }
    )

    // response intercept
    const responseIntercept = auth.interceptors.response.use(
      response => {
        console.log('RESPONSE INTERCEPTOR')
        console.log({ response })
        return response
      },
      async e => {
        console.log(e)

        const prevRequest = e?.config
        // check for unauthorized and request not sent to avoid loop
        //if (e?.response?.status === 403 && !prevRequest?.sent) {
        if (e?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true

          const newToken = await refresh({ auth: autContext, setAuth })

          prevRequest.headers['Authorization'] = `Bearer ${newToken.refresh}`
          prevRequest.headers.authorized = 'REFRESHED'
          return auth(prevRequest)
        }
        return Promise.reject(e)
      }
    )
    return () => {
      auth.interceptors.request.eject(requestIntercept)
      auth.interceptors.response.eject(responseIntercept)
    }
  }, [autContext, refresh])

  return auth
}

export default useApiPrivate
