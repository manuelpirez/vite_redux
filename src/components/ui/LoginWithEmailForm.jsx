import PropTypes from 'prop-types'
import FormInput from '@components/formInput/FormInput'
import FormButton from '@components/formButton/FormButton'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

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
