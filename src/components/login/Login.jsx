import LoginWithEmail from '@components/login/LoginWithEmail'
import LoginWithEmailAndPass from '@components/login/LoginWithEmailAndPass'
import Registration from '@components/login/Registration'

import { sections } from '@config'

const Login = () => {
  const {
    login: { forms }
  } = sections
  console.log({ forms })
  return (
    <>
      {forms.includes('otp') && <LoginWithEmail />}
      {forms.includes('LoginWithEmailAndPass') && <LoginWithEmailAndPass />}
      {forms.includes('registration') && <Registration />}
    </>
  )
}
export default Login
