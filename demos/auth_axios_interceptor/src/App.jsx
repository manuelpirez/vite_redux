import { Routes, Route } from 'react-router-dom'

import Feedback from './components/Feedback.jsx'
import Feed from './components/Feed.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import Layout from './components/Layout.jsx'
import Misc from './components/Misc.jsx'
import Profile from './components/Profile.jsx'
import NotFound from './components/NotFound.jsx'
import Unauthorized from './components/Unauthorized.jsx'
import Article from './components/Article.jsx'
import LinkPage from './components/LinkPage.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import PersistLogin from './components/PersistLogin.jsx'

import { ROLES } from './assets/roles.json'
import { ROUTES } from './assets/routes.json'

import useTracking from './hooks/useTracking.jsx'

function App() {
  // enable tracking
  useTracking()

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public */}
        <Route element={<PersistLogin />}>
          <Route path={ROUTES.login} element={<Login />} />
          <Route path={ROUTES.feedback} element={<Feedback />} />
          <Route path={ROUTES.misc} element={<Misc />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* protected  */}
          <Route element={<RequireAuth allowedRoles={Object.values(ROLES)} />}>
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.feed} element={<Feed />} />
            <Route path={ROUTES.article} element={<Article />} />
            <Route path={ROUTES.linkpage} element={<LinkPage />} />
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
