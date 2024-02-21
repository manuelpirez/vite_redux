import { useEffect } from 'react'

import publicApi, { getAnonToken } from '../../api/publicApi'

import useAuth from '../useAuthContext'

/**
 * Add anon token to request if not found
 * try to refresh anon if 403
 * @returns {AxiosInstance}
 */
const useApiPublic = () => {
  const { auth, setAuth } = useAuth()
  // console.log({auth})
  // console.log({payload})
  useEffect(() => {
    // if no token get anon
    const requestIntercept = publicApi.interceptors.request.use(
      async config => {
        // Modify the config object to include payload data
        //if (payload){
        // config.data = {
        // ...config.data,
        // ...payload
        // };
        // }

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

    // if anon unauth, try to refresh
    const responseIntercept = publicApi.interceptors.response.use(
      response => response,
      async error => {
        console.log('PUBLIC REFRESH')
        console.log(error)
        const prevRequest = error?.config

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true

          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

          return publicApi(prevRequest)
        }

        return Promise.reject(error)
      }
    )

    return () => {
      publicApi.interceptors.request.eject(requestIntercept)
      publicApi.interceptors.request.eject(responseIntercept)
    }
  }, [auth])

  return publicApi
}

export default useApiPublic
