import '@testing-library/jest-dom'
import FormInputHelper from './FormInputHelper'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { render } from '@testing-library/react'
import ntk from 'styles/themes/ntk'

describe('(Component) <FormInputHelper>', () => {
  const renderWithTheme = () =>
    render(
      <ThemeProvider theme={createTheme(ntk)}>
        <FormInputHelper error="Error Message" />
      </ThemeProvider>
    )

  it('should render & show error msg', () => {
    const { getByText } = renderWithTheme()
    const error = getByText('Error Message')
    expect(error).toBeInTheDocument()
  })
})
