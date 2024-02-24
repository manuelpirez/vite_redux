import '@testing-library/jest-dom'
import axios from 'axios'
import { fireEvent, waitFor, screen } from '@testing-library/react'
import { renderWithProviders } from 'testUtils'
import LoginWithEmail from './LoginWithEmail'

jest.mock('axios')

describe('(module) <LoginWithEmail> ', () => {
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

  const loginWithEmail = state => {
    const { render } = renderWithProviders({
      ui: <LoginWithEmail />,
      state,
      resources
    })
    return render
  }

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should exist', async () => {
    const { getByTestId } = loginWithEmail(state)
    await waitFor(() => expect(getByTestId('withemail')).toBeInTheDocument())
  })

  describe('when user submits', () => {
    it('form should submit', async () => {
      const { getByRole } = loginWithEmail(state)

      // email
      await waitFor(() => {
        const emailInput = getByRole('textbox')
        fireEvent.change(emailInput, {
          target: { value: cases.email }
        })
        expect(emailInput).toHaveValue(cases.email)
      })

      // submit
      axios.post.mockReturnValue(mockReturnValue)
      await waitFor(() => {
        fireEvent.click(screen.getByTestId('submit'))
      })

      // verify axios request
      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledTimes(1)
      })
    })
  })
})
