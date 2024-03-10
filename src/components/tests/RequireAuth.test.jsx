import { it, expect, describe } from 'vitest'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { renderWithProviders } from '@test/store-provider'

import authSlice from '@features/authSlice'
import RequireAuth from '@components/RequireAuth'

const reducers = { auth: authSlice }

const Test = () => <p>Fake text</p>
const Login = () => <p>Login</p>
const Integration = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<RequireAuth allowedRoles={['admin']} />}>
        <Route path="/" element={<Test />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
)

describe('<RequireAuth/>', () => {
  it('should return <Test /> when allowedRoles includes role', () => {
    const { getByText } = renderWithProviders(<Integration />, {
      reducers,
      preloadedState: {
        auth: {
          role: 'admin'
        }
      }
    })

    expect(getByText('Fake text')).toBeInTheDocument()
  })

  it('should not return <Login /> when allowedRoles do not include role', () => {
    const { getByText } = renderWithProviders(<Integration />, {
      reducers,
      preloadedState: {
        auth: {
          role: 'sad'
        }
      }
    })

    expect(getByText('Login')).toBeInTheDocument()
  })
})
