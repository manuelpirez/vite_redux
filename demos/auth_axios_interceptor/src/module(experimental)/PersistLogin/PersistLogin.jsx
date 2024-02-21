import { useEffect, useState } from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'

import useTokenLogin from '../hooks/useTokenLogin.jsx'
import useApiPrivate from '../hooks/useApiPrivate.jsx'

/**
 * The `PersistLogin` function handles the authentication and authorization logic in a React application.
 * It checks if the user is already authenticated and if not, it attempts to authenticate the user using a token from the URL.
 * It also verifies the token with an API endpoint and logs the user out if the token is invalid.
 * The function returns the `Outlet` component, which renders the appropriate content based on the user's authentication status.
 */
const PersistLogin = ({ auth, setAuth, tokenVerifyEndpoint }) => {
  const [isLoading, setIsLoading] = useState(true)

  const location = useLocation()
  const tokenLogin = useTokenLogin()
  const apiPrivate = useApiPrivate()

  const _tokenVerify = async isMounted => {
    setIsLoading(true)
    try {
      console.log('_tokenVerify')
      await apiPrivate.post(tokenVerifyEndpoint)
    } catch (e) {
      console.error(e)
      _tokenLogOut()
    } finally {
      isMounted && setIsLoading(false)
    }
  }
  const _tokenLogin = async isMounted => {
    setIsLoading(true)
    try {
      console.log('_tokenLogin')
      await tokenLogin({ auth, setAuth })
    } catch (e) {
      console.error(e)
      _tokenLogOut()
    } finally {
      isMounted && setIsLoading(false)
    }
  }
  const _tokenLogOut = () => {
    console.log('login out')
    setAuth({})
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  useEffect(() => {
    console.log('PERSIST')
    console.log({ auth })
    let isMounted = true

    if (location.search) {
      console.log('urltoken available')
      _tokenLogin(isMounted)
    } else if (auth?.access) {
      console.log('auth available, and no urltoken')
      _tokenVerify(isMounted)
    } else {
      console.log('free load')
      setIsLoading(false)
    }

    return () => {
      setIsLoading(false)
      isMounted = false
    }
  }, [location])

  if (isLoading) return <p> LOADING... </p>

  return <Outlet />
}

export default PersistLogin
