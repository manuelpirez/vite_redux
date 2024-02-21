import { apiRequest, getAnonToken } from '../../api/axios.jsx'
import { useEffect } from 'react'
import useAuth from '../useAuth.jsx'

// to avoid multiple rendering this will be moved to a module
const useApiRequest = () => {
  const { auth, setAuth } = useAuth()

  console.log('USEAPIREQUEST')
  console.log(auth)
  console.log('USEAPIREQUEST')

  useEffect(() => {
    const requestIntercept = apiRequest.interceptors.request.use(
      async config => {
        console.log('USEAPIREQUEST INTERCEPTOR')
        console.log({ config })
        console.log({ access: auth.access })
        console.log('USEAPIREQUEST INTERCEPTOR')

        if (auth?.access) {
          console.log('USEAPIREQUEST YES TOKEN')
          console.log({ access: auth.access })
          console.log('USEAPIREQUEST YES TOKEN')

          config.headers['Authorization'] = `Bearer ${auth.access}`
          config.headers.authorized = `YES`
        } else {
          const anontoken = await getAnonToken()
          const access = anontoken.access
          const refresh = anontoken.refresh
          const roles = anontoken.roles

          console.log('USEAPIREQUEST ANON TOKEN')
          console.log({ access: auth?.access })
          console.log({ access: anontoken.access })
          console.log('USEAPIREQUEST ANON TOKEN')

          setAuth({ access, roles, refresh })

          config.headers['Authorization'] = `Bearer ${access}`
          config.headers.authorized = `ANON`
        }

        return config
      },
      error => {
        console.log('PRIVATE AUTH ERROR')
        console.log(error)
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
