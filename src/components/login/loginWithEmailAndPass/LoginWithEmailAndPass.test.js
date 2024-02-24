import '@testing-library/jest-dom'
import axios from 'axios'
import { fireEvent, waitFor, within, screen } from '@testing-library/react'
import { renderWithProviders } from 'testUtils'
import LoginEmailPass from './LoginWithEmailAndPass'

jest.mock('axios')

describe('(Module) <LoginEmailPass> ', () => {
  const resources = {
    en: {
      translation: {
        signInPageUseEmailSubmit: 'submit',
        signInPageUseEmailFieldLabel: 'email',
        signInPageUseEmailPasswordFieldLabel: 'pass'
      }
    }
  }
  const mockReturnValue = {
    data: {
      tokens: {
        access: 'A',
        refresh: 'R'
      },
      info: {
        role: {
          name: 'auth',
          permissions: {
            roleLimits: {},
            routes: {}
          }
        },
        user: {
          idhProfileId: 318189118,
          countryCode: 'AX',
          professionId: 1
        }
      }
    }
  }

  const cases = {
    token: 'ACCESS',
    email: 'dev@longdong.com',
    goodInput: 'I am a known spartan'
  }
  const state = {
    authReducer: {
      access: cases.token
    }
  }

  const loginEmailPass = state => {
    const { render } = renderWithProviders({
      ui: <LoginEmailPass />,
      state,
      resources
    })
    return render
  }

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should exist', async () => {
    const { getByTestId } = loginEmailPass(state)
    await waitFor(() => expect(getByTestId('emailpass')).toBeInTheDocument())
  })

  describe('if showLogin is closed', () => {
    it('form should not exist', async () => {
      const myComponent = screen.queryByTestId('emailStandardForm')
      expect(myComponent).not.toBeInTheDocument()
    })
  })
  describe('if showLogin is open', () => {
    it('and user submits, form should submit', async () => {
      const { getByTestId, getByText } = loginEmailPass(state)

      const loginLink = getByText('signInUsingPassword')
      fireEvent.click(loginLink)

      // email
      const emailInput = within(getByTestId('emailStandard')).getByRole(
        'textbox'
      )
      fireEvent.change(emailInput, {
        target: { value: cases.email }
      })
      await waitFor(() => {
        expect(emailInput).toHaveValue(cases.email)
      })

      // password
      fireEvent.change(
        within(getByTestId('pdValue')).getByTestId('form-input'),
        {
          target: { value: cases.goodInput }
        }
      )

      // submit
      axios.post.mockReturnValue(mockReturnValue)
      expect(getByTestId('submit')).toBeInTheDocument()
      await waitFor(() => {
        fireEvent.click(screen.getByText(/submit/i))
      })

      // verify axios request
      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledTimes(1)
      })
    })
  })
})
