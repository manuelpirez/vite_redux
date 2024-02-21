import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { actions } from '@static/tracking.json'
//import useTrackingService from '@hooks/tracking/useTrackingService'

const useTracking = () => {
  const location = useLocation()
  //const { initializeTrackingScript } = useTrackingService()

  useEffect(() => {
    // only init once init flag from state
    /*initializeTrackingScript({
      url: '//staging-piwik.docguide.com/',
      piwikSiteId: 123,
      scriptName: 'piwik.js',
      scriptUrl: '//staging.piwik.pslgroup.com/',
      secure: true
    })*/
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
