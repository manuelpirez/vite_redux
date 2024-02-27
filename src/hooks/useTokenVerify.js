import { useDispatch, useSelector } from 'react-redux'
import {
  logOut,
  selectAccessToken,
  setDefCredentials
} from '@features/authSlice.js'
import { useTokenVerifyMutation } from '@features/endpoints/privateRequestsSlice.js'

/**
 * Use URL token to log user in
 * @returns {function(): Promise<unknown>}
 */
const useTokenVerify = () => {
  const token = useSelector(selectAccessToken)
  const dispatch = useDispatch()
  const [tokenVerify] = useTokenVerifyMutation()

  return async () => {
    try {
      const response = await tokenVerify(token).unwrap()
      dispatch(setDefCredentials({ ...response }))
    } catch (e) {
      dispatch(logOut())
      throw Error(e.message)
    }
  }
}
export default useTokenVerify
