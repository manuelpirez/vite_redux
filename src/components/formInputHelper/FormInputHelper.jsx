import PropTypes from 'prop-types'

import FormHelperText from '@mui/material/FormHelperText'
import { useTheme } from '@mui/material'

/**
 * Renders Helper text as an error message
 * @param message
 * @param error
 * @returns {JSX.Element}
 */
const FormInputHelper = ({ message, error }) => {
  const theme = useTheme()
  const styles = {
    ...theme.components.FormInputHelper.styleOverrides.root,
    color: error ? 'error.main' : 'formInputHelper.helperText'
  }
  return (
    <FormHelperText sx={styles} error={!error} data-testid="form-error">
      {error || message}
    </FormHelperText>
  )
}
FormInputHelper.propTypes = {
  /**
   * string containing the error message
   */
  error: PropTypes.string,
  /**
   * string containing helper text
   */
  message: PropTypes.string
}
export default FormInputHelper
