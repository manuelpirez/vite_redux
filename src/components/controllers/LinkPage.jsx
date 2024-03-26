import { Link } from 'react-router-dom'
import { ROUTES } from '@static/routes.json'
import { Fragment } from 'react'

const LinkPage = () => {
  return (
    <section>
      <h1>Links</h1>
      <br />
      {Object.keys(ROUTES).map(route => {
        return (
          <Fragment key={route}>
            <Link to={`/${ROUTES[route]}`}>{route}</Link>
            <br />
          </Fragment>
        )
      })}
    </section>
  )
}

export default LinkPage
