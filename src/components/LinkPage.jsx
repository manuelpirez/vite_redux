import { Link } from 'react-router-dom'
import { ROUTES } from '@static/routes.json'

const LinkPage = () => {
  return (
    <section>
      <h1>Links</h1>
      <br />
      {Object.keys(ROUTES).map(route => (
        <Link key={route} to={`/${ROUTES[route]}`}>
          {route}
        </Link>
      ))}
    </section>
  )
}

export default LinkPage
