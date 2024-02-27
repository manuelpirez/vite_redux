import LoginWithEmail from '@components/LoginWithEmail'
import LoginWithEmailAndPass from '@components/LoginWithEmailAndPass'
import Registration from '@components/Registration'

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
