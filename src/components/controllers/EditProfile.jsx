import { Link } from 'react-router-dom'

/**
 * Profile function component.
 *
 * Renders the Edit Profile Page.
 *
 * @returns {JSX.Element} The rendered Edit Profile Page.
 */
const EditProfile = () => {
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

export default EditProfile
