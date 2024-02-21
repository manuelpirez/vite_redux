import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routesConstants.jsx'

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
