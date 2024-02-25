import { Routes, Route } from 'react-router-dom'

import { ROLES } from '@static/roles.json'
import { ROUTES } from '@static/routes.json'

import Login from '@components/login/Login'
import LoginSuccess from '@components/login/LoginSuccess'

import PersistLogin from '@components/auth/PersistLogin'
import RequireAuth from '@components/auth/RequireAuth'

import Feedback from '@components/Feedback'
import Feed from '@components/feed/Feed'
import Misc from '@components/Misc'
import Profile from '@components/Profile'
import Article from '@components/Article'
import LinkPage from '@components/LinkPage'
import Home from '@components/Home'
import Layout from '@components/Layout'
import NotFound from '@components/NotFound'
import Unauthorized from '@components/Unauthorized'

function App() {
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
