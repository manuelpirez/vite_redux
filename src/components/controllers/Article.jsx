import { Link } from 'react-router-dom'

const Article = () => {
  return (
    <>
      <section>
        <h1>The Article Page!</h1>
        <br />
        <p>Here the article Body and feed</p>
        <div className="flexGrow">
          <Link to="/">Home</Link>
        </div>
      </section>
      <p>Feed</p>
    </>
  )
}

export default Article
