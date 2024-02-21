import { useNavigate, Link } from 'react-router-dom'

import useLogout from '../hooks/useLogout.jsx'

const Home = () => {
  const navigate = useNavigate()
  const logout = useLogout()

  const signOut = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/article">Article</Link>
      <br />
      <Link to="/feed">Feed</Link>
      <br />
      <Link to="/feedback">Feedback</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={signOut}>Sign Out</button>
      </div>
    </section>
  )
}

export default Home
