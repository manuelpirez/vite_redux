import '@testing-library/jest-dom'
import { renderWithProviders } from 'testUtils'
import Login from './Login'
import { fireEvent, waitFor } from '@testing-library/react'

describe('(Module) <Login> ', () => {
  const login = () => {
    const { render } = renderWithProviders({
      ui: <Login />
    })
    return render
  }
  beforeAll(() => {
    // Mock the matchMedia method
    const mockMatchMedia = () => ({
      addListener: jest.fn(),
      removeListener: jest.fn()
    })
    // Set the mockMatchMedia as a global mock for window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia
    })
  })

  it('should render', async () => {
    const { getByTestId } = login()
    await waitFor(() => expect(getByTestId('withemail')).toBeInTheDocument())
    await waitFor(() => expect(getByTestId('registration')).toBeInTheDocument())
  })

  describe('when user clicks LoginLink', () => {
    it('should show LoginEmailPass Section', async () => {
      const { getByTestId, getByText } = login()
      const loginLink = getByText('signInUsingPassword')
      fireEvent.click(loginLink)
      await waitFor(() => expect(getByTestId('emailpass')).toBeInTheDocument())
    })
  })
})
