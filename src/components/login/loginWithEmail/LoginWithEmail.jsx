import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import useTracking from '@hooks/tracking/useTracking'

import useLogin from '@hooks/auth/useLogin.js'
import LoginWithEmailForm from '@components/ui/LoginWithEmailForm'

const LoginWithEmail = () => {
  const { t } = useTranslation()
  const { trackClickAction } = useTracking()
  const { loginWithEmail } = useLogin()
  const [isLoading, setIsLoading] = useState(false)

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email(t('signInInvalidEmail'))
      .required(t('signInRequiredEmail'))
  })
  const initialValues = { email: '' }
  const onSubmit = async values => {
    setIsLoading(true)
    try {
      await loginWithEmail({ ...values })
      trackClickAction({
        title: 'login-email',
        clickType: 'login-email'
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues
  })
  return (
    <LoginWithEmailForm
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      signInHeader={t('signInHeader')}
      signInSubHeader={t('signInSubHeader')}
      signInEmailSubmitButton={t('signInEmailSubmitButton')}
    />
  )
}
export default LoginWithEmail
