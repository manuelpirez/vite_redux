import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import useTokenLogin from '@hooks/auth/useTokenLogin.js'
import useTokenVerify from '@hooks/auth/useTokenVerify.js'

import { selectAccessToken } from '@features/auth/authSlice.js'

/**
 * The `PersistLogin` function handles the authentication and authorization logic in a React application.
 * It checks if the user is already authenticated and if not, it attempts to authenticate the user using a token from the URL.
 * It also verifies the token with an API endpoint and logs the user out if the token is invalid.
 * The function returns the `Outlet` component, which renders the appropriate content based on the user's authentication status.
 */
const PersistLogin = () => {
  const location = useLocation()
  const tokenLogin = useTokenLogin()
  const tokenVerify = useTokenVerify()
  const token = useSelector(selectAccessToken)

  const [isLoading, setIsLoading] = useState(true)

  const _tokenVerify = async isMounted => {
    setIsLoading(true)
    try {
      console.log('_tokenVerify')
      await tokenVerify()
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
      await tokenLogin()
    } catch (e) {
      console.error(e)
      _tokenLogOut()
    } finally {
      isMounted && setIsLoading(false)
    }
  }
  const _tokenLogOut = () => {
    console.log('_tokenLogOut')
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  useEffect(() => {
    console.log('PERSIST')
    //console.log({auth})
    let isMounted = true

    if (location.search) {
      console.log('urltoken available')
      _tokenLogin(isMounted)
    } else if (token) {
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
    // eslint-disable-next-line
  }, [location])

  if (isLoading) return <p> LOADING... </p>

  return <Outlet />
}

export default PersistLogin
