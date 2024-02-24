import '@testing-library/jest-dom'
import FormButton from './FormButton'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { render } from '@testing-library/react'
import ntk from 'styles/themes/ntk'

const renderWithTheme = props =>
  render(
    <ThemeProvider theme={createTheme(ntk)}>
      <FormButton {...props} />
    </ThemeProvider>
  )

describe('(Component) FormButton', () => {
  describe('<Button> should exist', () => {
    it('should exist', () => {
      const { getByRole } = renderWithTheme()
      const button = getByRole('button')
      expect(button).toBeInTheDocument()
    })
    describe('if loading prop is true', () => {
      it('should have the CircularProgress component', () => {
        const { getByRole } = renderWithTheme({ loading: true })
        const button = getByRole('progressbar')
        expect(button).toHaveAttribute(
          'class',
          expect.stringContaining('MuiCircularProgress-root')
        )
      })
    })
    describe('if type prop is defined', () => {
      it('should be a submit type button', () => {
        const { getByRole } = renderWithTheme({ type: 'submit' })
        const button = getByRole('button')
        expect(button).toHaveAttribute(
          'type',
          expect.stringContaining('submit')
        )
      })
    })
    describe('if variant prop is defined', () => {
      it('should render a button', () => {
        const { getByRole } = renderWithTheme({ variant: 'feedback' })
        const button = getByRole('button')
        expect(button).toBeInTheDocument()
      })
    })
  })
})
