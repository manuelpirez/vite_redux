import { useDispatch, useSelector } from 'react-redux'

import {
  logOut,
  setDefCredentials,
  selectAccessToken,
  selectRole
} from '@features/authSlice.js'

/**
 * A custom hook for managing authentication state.
 *
 * @returns {Object} An object containing the token, role, setDefaultTokenCredentials, and logout functions.
 */
const useAuth = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectAccessToken)
  const role = useSelector(selectRole)

  const setDefaultTokenCredentials = credentials => {
    dispatch(setDefCredentials({ ...credentials }))
  }
  const logout = () => {
    dispatch(logOut())
  }

  return {
    token,
    role,
    setDefaultTokenCredentials,
    logout
  }
}

export default useAuth
