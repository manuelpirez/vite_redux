import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <section>
      <h1>Edit Profile Page</h1>
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  )
}

export default Profile
