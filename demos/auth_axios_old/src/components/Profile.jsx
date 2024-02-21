import { Link } from 'react-router-dom'
import Users from './Users'

const Profile = () => {
  return (
    <section>
      <h1>Edit Profile Page</h1>
      <br />
      <Users />
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  )
}

export default Profile
