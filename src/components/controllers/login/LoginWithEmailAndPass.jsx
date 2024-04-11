import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useNavigate } from 'react-router-dom'

// import useTracking from '@hooks/useTracking'
import useLogin from '@hooks/useLogin.js'

import LoginWithEmailAndPassForm from '@ui/LoginWithEmailAndPassForm'

const LoginWithEmailAndPass = () => {
  const { t } = useTranslation()
  const { login } = useLogin()
  const navigate = useNavigate()
  // const { trackClickAction } = useTracking()

  const [showLogin, setShowLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const initialValues = { emailStandard: '', pdValue: '' }
  const onSubmit = async values => {
    try {
      setIsLoading(true)
      await login({
        ...values,
        email: values.emailStandard
      })
      // trackClickAction({
      //   title: 'login-email',
      //   clickType: 'login-email'
      // })
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const validationSchema = Yup.object({
    emailStandard: Yup.string()
      .trim()
      .email(t('signInInvalidEmail'))
      .required(t('signInRequiredEmail')),
    pdValue: Yup.string().required(t('signInRequiredPassword'))
  })
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues
  })

  const loginClick = () => setShowLogin(true)
  return (
    <LoginWithEmailAndPassForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      loginClick={loginClick}
      loginFetching={isLoading}
      showLogin={showLogin}
      control={control}
      signInPageUseEmail={t('signInPageUseEmail')}
      signInPageUseEmailFieldLabel={t('signInPageUseEmailFieldLabel')}
      signInPageUseEmailPasswordFieldLabel={t(
        'signInPageUseEmailPasswordFieldLabel'
      )}
      signInPageUseEmailSubmit={t('signInPageUseEmailSubmit')}
      signInEmailLinkInstruction={t('signInEmailLinkInstruction')}
      signInUsingPassword={t('signInUsingPassword')}
    />
  )
}
export default LoginWithEmailAndPass
