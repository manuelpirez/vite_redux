import { Link } from 'react-router-dom'

const Misc = () => {
  return (
    <section>
      <h1>Misc Page</h1>
      <br />
      <p>HERE ALL THE STATIC PAGES FROM MISC API</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  )
}

export default Misc
