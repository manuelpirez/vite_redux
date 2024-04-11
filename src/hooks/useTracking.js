import { useLocation } from 'react-router-dom'
import { actions } from '@static/tracking.json'
import { initialized } from '@utils/tracking/trackUtil'

const useTracking = () => {
  const location = useLocation()

  const trackView = () => {
    console.log('TRACK HOOK: trackPageView')
    console.log({ track })
    const track = actions[location.pathname]?.name || location.pathname
  }

  const trackAction = ({ actionName, extra }) => {
    console.log('TRACK HOOK: trackAction')
    console.log({ track, extra })
    const track = actions[actionName]?.name || actionName
  }

  const track = async ({ action = '', actionName = '', extra = '' }) => {
    console.log({ initialized })
    switch (action) {
      case 'view':
        trackView({ actionName })
        break
      case 'action':
        trackAction({ actionName, extra })
        break
      default:
        console.error('Track type not available')
    }
  }

  return track
}
export default useTracking
