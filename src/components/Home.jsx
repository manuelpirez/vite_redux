import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, logOut } from '@features/auth/authSlice.js'
const Home = () => {
  const navigate = useNavigate()
  const userData = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const signOut = async () => {
    dispatch(logOut())
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
      <br />
      <h2>User Data</h2>
      {JSON.stringify(userData)}
    </section>
  )
}

export default Home
