import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth.jsx'
import useTokenLogin from '../hooks/useTokenLogin.jsx'
import useApiPrivate from '../hooks/oldHooks/useApiPrivate.jsx'
import { TOKEN_VERIFY } from '../constants/apiConstants.jsx'
// validate against API on every redirection
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { auth, persist } = useAuth()

  const location = useLocation()

  //const verify = useVerifyToken()
  const login = useTokenLogin()
  const apiPrivate = useApiPrivate()

  useEffect(() => {
    console.log('PERSIST')
    console.log({ auth })
    let isMounted = true
    const verifyToken = async () => {
      setIsLoading(true)
      try {
        //await verify()
        await apiPrivate.post(TOKEN_VERIFY, { token: auth.access })
      } catch (e) {
        console.error(e)
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    const tokenLogin = async () => {
      setIsLoading(true)
      try {
        await login()
      } catch (e) {
        console.error(e)
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    // verify if token if exists and persists
    // if (auth?.access && persist) {

    if (location.search) {
      console.log('urltoken available')
      tokenLogin()
      // below will only work with cache token
    } else if (auth?.access && !location.search) {
      console.log('auth available, and no urltoken')
      verifyToken()
    } else if (!auth?.access) {
      console.log('free load')
      setIsLoading(false)
    }

    // prevent memory leak
    return () => {
      setIsLoading(false)
      isMounted = false
    }
  }, [location])

  if (!persist) {
    return <Outlet />
  }
  if (isLoading) {
    return <p> LOADING... </p>
  }
  return <Outlet />
}

export default PersistLogin
