import LoginWithEmail from './LoginWithEmail'
import LoginWithEmailAndPass from './LoginWithEmailAndPass'
import Registration from './Registration'

import { sections } from '@config'

const Login = () => {
  const {
    login: { forms }
  } = sections
  return (
    <>
      {forms.includes('otp') && <LoginWithEmail />}
      {forms.includes('LoginWithEmailAndPass') && <LoginWithEmailAndPass />}
      {forms.includes('registration') && <Registration />}
    </>
  )
}
export default Login
