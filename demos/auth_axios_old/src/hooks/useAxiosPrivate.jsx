import { axiosPrivate } from '../api/axios'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import useAuth from './useAuth'

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth()

  console.log('AXIOS PRIVATE')
  console.log(auth)

  useEffect(() => {
    // if auth header, no refresh
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        console.log('PRIVATE AUTH')
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
        }
        return config
      },
      error => {
        console.log('PRIVATE AUTH ERROR')
        console.log(error)
        return Promise.reject(error)
      }
    )

    // response intercept
    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        console.log('PRIVATE REFRESH')
        console.log(error)
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  return axiosPrivate
}

export default useAxiosPrivate
