import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useTokenLoginMutation } from '@features/endpoints/rawRequestsSlice.js'
import { setDefCredentials } from '@features/authSlice.js'

/**
 * A custom hook for token-based login functionality.
 *
 * It retrieves the current location using the `useLocation` hook from `react-router-dom`,
 * dispatches actions using the `useDispatch` hook from `react-redux`, and makes API requests
 * using the `useTokenLoginMutation` hook from `@features/endpoints/rawRequestsSlice.js`.
 *
 * The hook provides three login methods: `otpLogin`, `dpLogin`, and `limitedLogin`.
 * Each method makes an API request using the `tokenLogin` function and dispatches the response
 * using the `setDefCredentials` action.
 *
 * @returns {Function} - A function that can be called to perform token-based login based on the current location.
 *                      The function checks for query parameters in the URL and calls the appropriate login method
 *                      based on the presence of specific parameters.
 * @throws {Error} - If an error occurs during the login process, an error is thrown with the error message.
 */
const useTokenLogin = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [tokenLogin] = useTokenLoginMutation()

  const otpLogin = async otp => {
    console.log('otpLogin')
    try {
      const response = await tokenLogin(otp).unwrap()
      dispatch(setDefCredentials({ ...response }))
    } catch (e) {
      console.error(e)
      throw Error(e.message)
    }
  }
  const dpLogin = async dp => {
    console.log('dpLogin')
    try {
      const response = await tokenLogin(dp).unwrap()
      dispatch(setDefCredentials({ ...response }))
    } catch (e) {
      console.error(e)
      throw Error(e.message)
    }
  }
  const limitedLogin = async dspId => {
    console.log('limitedLogin')
    try {
      const response = await tokenLogin(dspId).unwrap()
      dispatch(setDefCredentials({ ...response }))
    } catch (e) {
      console.error(e)
      throw Error(e.message)
    }
  }

  return async () => {
    if (location.search) {
      const urlParams = new URLSearchParams(location.search)
      urlParams.has('otp') && (await otpLogin(urlParams.get('otp')))
      urlParams.has('dp') && (await dpLogin(urlParams.get('dp')))
      urlParams.has('dspId') && (await limitedLogin(urlParams.get('dspId')))
    }
  }
}
export default useTokenLogin
