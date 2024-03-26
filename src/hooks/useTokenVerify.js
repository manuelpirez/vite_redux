import { useSelector } from 'react-redux'
import { selectAccessToken } from '@features/authSlice.js'
import { useTokenVerifyMutation } from '@features/endpoints/privateRequestsSlice.js'

/**
 * Use URL token to log user in
 * @returns {function(): Promise<unknown>}
 */
const useTokenVerify = () => {
  const token = useSelector(selectAccessToken)
  const [tokenVerify] = useTokenVerifyMutation()

  return async () => {
    try {
      return await tokenVerify(token).unwrap()
    } catch (e) {
      console.error(e)
      throw Error(e)
    }
  }
}
export default useTokenVerify
