import { Link } from 'react-router-dom'
import Feed from './Feed.jsx'

const Article = () => {
  return (
    <>
      <section>
        <h1>The Article Page</h1>
        <br />
        <p>Here the article Body and feed</p>
        <div className="flexGrow">
          <Link to="/">Home</Link>
        </div>
      </section>
      <Feed />
    </>
  )
}

export default Article
