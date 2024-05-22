import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import FormInput from '@ui/FormInput'
import FormButton from '@ui/FormButton'

const container = {
  marginTop: '58px'
}
const titleContainer = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '17px'
}
const inputLabelStyle = theme => ({
  marginTop: '8px',
  ...theme.typography.loginInput.label
})
/**
 *
 * Renders a form for logging in with email, including input fields for email and a submit button.
 *
 * @param {Object} props - The props object containing the following properties:
 * @param {boolean} props.isLoading - Flag indicating if the form is in a loading state.
 * @param {function} props.handleSubmit - Function to handle form submission.
 * @param {function} props.onSubmit - Function to be called on form submission.
 * @param {Object} props.control - Control object for managing form inputs.
 * @param {string} props.signInHeader - Header text for the sign-in form.
 * @param {string} props.signInSubHeader - Subheader text for the sign-in form.
 * @param {string} props.signInEmailSubmitButton - Text for the submit button.
 *
 * @returns {JSX.Element} - Returns the JSX element representing the login form with email input and submit button.
 */
const LoginWithEmailForm = ({
  isLoading,
  handleSubmit,
  onSubmit,
  control,
  signInHeader,
  signInSubHeader,
  signInEmailSubmitButton
}) => {
  return (
    <Box sx={container} data-testid="withemail">
      <Box sx={titleContainer}>
        <Typography variant="formTitle">{signInHeader}</Typography>
        <Typography variant="formSubtitle">{signInSubHeader}</Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          name="email"
          placeholder="drsmith@gmail.com"
          control={control}
          labelStyle={inputLabelStyle}
          sx={theme => ({
            '.MuiOutlinedInput-input': {
              '&::placeholder': {
                color: theme.palette.formInput.placeholderSecondary
              }
            }
          })}
        />
        <FormButton
          type="submit"
          data-testid="submit"
          section="loginWithEmail"
          loading={isLoading}
          disabled={isLoading}
        >
          {signInEmailSubmitButton}
        </FormButton>
      </form>
    </Box>
  )
}
LoginWithEmailForm.propTypes = {
  isLoading: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  signInHeader: PropTypes.string,
  signInSubHeader: PropTypes.string,
  signInEmailSubmitButton: PropTypes.string
}
export default LoginWithEmailForm
