import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@features/authSlice'
import { useRegistrationMutation } from '@features/endpoints/publicRequestsSlice'

const useStdEmailRequest = () => {
  const user = useSelector(selectCurrentUser)
  const [registration] = useRegistrationMutation()

  const request = async payload => {
    const data = {
      brandCode: 123,
      configType: 'standard',
      idhBrandId: 123,
      notifyCS: true,
      siteId: 123,
      source: {
        siteId: 123,
        siteName: 123,
        country: 'country',
        profession: 'profession',
        specialty: 'specialty',
        specialtyId: 'specialtyId',
        specialtyIdLima: 'specialtyIdLima',
        specialtyLima: 'specialtyLima',
        idhSiteId: 'idhSiteId',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        device: navigator.userAgent,
        deviceId: 'deviceId',
        dspId: 'dspId',
        interactionId: 'interactionId',
        lastAction: 'lastAction',
        piwikSiteId: 'piwikSiteId',
        campaignId: 'campaignId',
        articleId: 'articleId'
      },
      ...payload
    }
    console.log({ user, data })
    return await registration({ ...data }).unwrap()
  }

  return { request }
}

export default useStdEmailRequest
