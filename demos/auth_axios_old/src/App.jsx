import Feedback from './components/Feedback.jsx'
import Feed from './components/Feed.jsx'
import Login from './components/Login'
import Home from './components/Home'
import Layout from './components/Layout'
import Misc from './components/Misc.jsx'
import Profile from './components/Profile.jsx'
import NotFound from './components/NotFound'
import Unauthorized from './components/Unauthorized'
import Article from './components/Article.jsx'
import LinkPage from './components/LinkPage'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './components/PersistLogin.jsx'

import { Routes, Route } from 'react-router-dom'

import useTracking from './hooks/useTracking.jsx'

const ROLES = {
  default: 'default',
  auth: 'auth',
  soft: 'soft',
  limited: 'limited',
  limited_reg: 'limited_reg'
}
const ROUTES = {
  home: '/',
  login: 'login',
  profile: 'profile',
  feedback: 'feedback',
  feed: 'feed',
  misc: 'misc',
  article: 'article',
  linkpage: 'linkpage'
}

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
