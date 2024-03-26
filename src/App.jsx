import { Routes, Route } from 'react-router-dom'

import { ROLES } from '@static/roles.json'
import { ROUTES } from '@static/routes.json'

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
