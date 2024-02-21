import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
// check dictionary for custom tracking
import { actions } from '../assets/tracking.json'

const useTracking = () => {
  const location = useLocation()

  useEffect(() => {
    console.log(location)
    console.log(location.state)
    trackPageView(location)
  }, [location])

  //const dispatch = useDispatch()
  const trackSubmitAction = ({ action }) => {
    console.log('trackSubmitAction')
    const track = actions[action]?.name || action
    console.log({ track })
    //dispatch(trackActions.trackSubmitAction(obj))
  }

  const trackPageView = location => {
    console.log('trackPageView')
    const track = actions[location.pathname]?.name || location.pathname
    console.log({ track })
    //dispatch(trackActions.trackPageView(obj))
  }

  const trackClickAction = ({ action }) => {
    console.log('trackClickAction')
    console.log({ action })
    //dispatch(trackActions.trackClickAction(obj))
  }

  const trackAction = ({ action, extra }) => {
    console.log('trackAction')
    const track = actions[action]?.name || action
    console.log({ track, extra })
    //dispatch(trackActions.trackCustomAction(obj))
  }

  return { trackSubmitAction, trackPageView, trackClickAction, trackAction }
}
export default useTracking
