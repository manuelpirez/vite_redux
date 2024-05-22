import { Outlet } from 'react-router-dom'

/**
 * @returns {JSX.Element}
 * @constructor
 */
const Layout = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  )
}

export default Layout
