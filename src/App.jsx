import { Routes, Route } from 'react-router-dom'
import { ROLES } from '@static/roles.json'
import { ROUTES } from '@static/routes.json'

import Feedback from '@components/Feedback.jsx'
import Feed from '@components/feed/Feed.jsx'
import Misc from '@components/Misc.jsx'
import Profile from '@components/Profile.jsx'
import Article from '@components/Article.jsx'
import LinkPage from '@components/LinkPage'
import PersistLogin from '@components/PersistLogin.jsx'
import Home from '@components/Home'
//import Login from '@components/Login'
import RequireAuth from '@components/RequireAuth'
import Layout from '@components/Layout'
import NotFound from '@components/NotFound'
import Unauthorized from '@components/Unauthorized'

import Login from '@components/login/Login'
import LoginSuccess from '@components/login/loginSuccess/LoginSuccess'

import useTracking from '@hooks/tracking/useTracking.js'

function App() {
  useTracking()

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
            <Route path={ROUTES.profile} element={<Profile />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
