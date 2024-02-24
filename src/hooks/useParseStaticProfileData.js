import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { profile_form } from '@static/profile.json'

const { professions, limaSpecialtiesDropdown, countries } = profile_form

const useParseStaticProfileData = () => {
  const { t } = useTranslation()

  const parseProfessions = useMemo(() => {
    let parsedProf = {}
    Object.values(professions).forEach(key => {
      parsedProf[key] = t(`editProfileProfessionList.${key}`)
    })
    return parsedProf
  }, [t])

  const parseLimaSpecialties = useMemo(() => {
    let parsedSpec = {}
    limaSpecialtiesDropdown.forEach(({ specialtyLima }) => {
      parsedSpec[specialtyLima] = t(`editProfileSpecialtyList.${specialtyLima}`)
    })
    return parsedSpec
  }, [t])

  const parseCountries = useMemo(() => {
    const transCountry = {}
    Object.keys(countries).forEach(key => {
      transCountry[key] = t(`editProfileCountryList.${key}`)
    })
    return transCountry
  }, [t])

  return { parseProfessions, parseLimaSpecialties, parseCountries }
}

export default useParseStaticProfileData
