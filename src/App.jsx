import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import { ROUTES } from '@static/routes.json'
import { ROLES } from '@static/roles.json'

import LoginSuccess from '@controllers/LoginSuccess'
import Unauthorized from '@controllers/Unauthorized'
import EditProfile from '@controllers/EditProfile'
import Feedback from '@controllers/Feedback'
import NotFound from '@controllers/NotFound'
import LinkPage from '@controllers/LinkPage'
import Article from '@controllers/Article'
import Login from '@controllers/login'
import Feed from '@controllers/Feed'
import Home from '@controllers/Home'
import Misc from '@controllers/Misc'

import PersistLogin from '@auth/PersistLogin'
import RequireAuth from '@auth/RequireAuth'

import Layout from '@ui/Layout'
// import initTrackingScript, {
//   initialized,
//   track
// } from '@utils/tracking/trackUtil'
// import useGetParams from '@hooks/useGetParams'
import useTrackingScript from '@hooks/useTrackingScript'

function App() {
  const { track, initTrackingScript, initialized } = useTrackingScript()
  // let i = 6
  // code should replace default click type with test click
  // the rest of the values set in tracking.json should use cache values that match cache_name
  track('initApp', { 'Click Type': 'test click' }, { user: 'val' })
  // const { mergedParams } = useGetParams(['interactionid'])
  // console.log({ mergedParams })
  useEffect(() => {
    console.log({ initialized })
    const initializeTracking = async () => {
      const isInit = await initTrackingScript()
      // window.location.replace('https://www.example.com')
      console.log('APP: tracking script loaded')
      if (isInit) {
        console.log({ initialized })
        console.log('APP: Tracking service initialized successfully.')
      } else {
        console.log({ initialized })
        console.error('APP: Failed to initialize tracking service.')
        // Handle initialization failure
      }
    }

    initializeTracking()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public */}
        <Route element={<PersistLogin />}>
          <Route path={ROUTES.login} element={<Login />} />
          <Route path={ROUTES.loginSuccess} element={<LoginSuccess />} />

          <Route path={ROUTES.feedback} element={<Feedback />} />
          <Route path={ROUTES.misc} element={<Misc />} />
          <Route path={ROUTES.unauthorized} element={<Unauthorized />} />

          <Route element={<RequireAuth allowedRoles={Object.values(ROLES)} />}>
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.article} element={<Article />} />
            <Route path={ROUTES.linkpage} element={<LinkPage />} />
            <Route path={ROUTES.feed} element={<Feed />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.auth]} />}>
            <Route path={ROUTES.profile} element={<EditProfile />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
