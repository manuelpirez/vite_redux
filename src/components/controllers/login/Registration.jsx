import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import useRecaptcha from '@hooks/useRecaptcha.js'
import useStdEmailRequest from '@hooks/useStdEmailRequest.js'
import useParseStaticProfileData from '@hooks/useParseStaticProfileData.js'

import RegistrationForm from '@ui/RegistrationForm'

import { localization, environment } from '@config'

const DEFAULT_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  state: '',
  country: '',
  specialty: '',
  profession: '',
  toggle: false
}

const Registration = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const { request } = useStdEmailRequest()
  const { parseProfessions, parseLimaSpecialties, parseCountries } =
    useParseStaticProfileData()
  useRecaptcha()

  const validationSchema = Yup.object({
    firstName: Yup.string().trim().required(t('registrationFirstNameRequired')),
    lastName: Yup.string().trim().required(t('registrationLastNameRequired')),
    email: Yup.string()
      .trim()
      .email(t('registrationEmailRequired'))
      .required(t('registrationEmailRequired')),
    state: Yup.string().trim().required(t('registrationStateRequired')),
    country: Yup.string().trim().required(t('registrationCountryRequired')),
    specialty: Yup.string().trim().required(t('registrationSpecialtyRequired')),
    profession: Yup.string()
      .trim()
      .required(t('registrationProfessionRequired')),
    toggle: Yup.boolean().equals([true], t('registrationPrivacyPolicyRequired'))
  })
  const mapInputItems = [
    {
      label: t('registrationFirstName'),
      name: 'firstName',
      type: 'text'
    },
    {
      label: t('registrationLastName'),
      name: 'lastName',
      type: 'text'
    },
    {
      label: t('registrationEmail'),
      name: 'email',
      type: 'email'
    },
    {
      label: t('registrationCountry'),
      name: 'country',
      options: parseCountries,
      placeholder: t('registrationCountryPlaceholder')
    },
    {
      label: t('registrationState'),
      name: 'state',
      type: 'text'
    },
    {
      label: t('registrationProfession'),
      name: 'profession',
      options: parseProfessions,
      placeholder: t('registrationProfessionPlaceholder')
    },
    {
      label: t('registrationSpecialty'),
      name: 'specialty',
      options: parseLimaSpecialties,
      placeholder: t('registrationSpecialtyPlaceholder')
    }
  ]
  const onSubmit = async values => {
    try {
      setIsLoading(true)
      const token = await new Promise((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(environment.recaptchaKey, { action: 'registration' })
            .then(token => {
              resolve(token)
            })
            .catch(err => {
              reject(err)
            })
        })
      })
      const payload = { ...values, option: ' ' }
      delete payload.toggle
      await request({
        registration: { ...payload },
        reCaptcha: token
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: DEFAULT_VALUES
  })

  return (
    <RegistrationForm
      handleSubmit={handleSubmit(onSubmit)}
      mapInputItems={mapInputItems}
      control={control}
      isLoading={isLoading}
      registrationHeader={t('registrationHeader')}
      registrationDescription={t('registrationDescription', {
        channelName: localization.brand
      })}
      registrationPrivacy={t('registrationPrivacy')}
      registrationRegisterButton={t('registrationRegisterButton')}
    />
  )
}
export default Registration
