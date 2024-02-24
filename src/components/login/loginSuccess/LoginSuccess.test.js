import '@testing-library/jest-dom'
import { renderWithProviders } from 'testUtils'
import LoginSuccess from './LoginSuccess'
import { waitFor } from '@testing-library/react'

describe('(module) <LoginSuccess> ', () => {
  const loginSuccess = () => {
    const { render } = renderWithProviders({
      ui: <LoginSuccess />
    })
    return render
  }
  beforeAll(() => {
    const mockMatchMedia = () => ({
      addListener: jest.fn(),
      removeListener: jest.fn()
    })
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia
    })
  })

  it('should render', () => {
    const { getByTestId } = loginSuccess()
    waitFor(() => expect(getByTestId('success')).toBeInTheDocument())
  })
})
