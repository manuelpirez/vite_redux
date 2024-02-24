import PropTypes from 'prop-types'

import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import FormDivider from '@components/formDivider/FormDivider'
import FormButton from '@components/formButton/FormButton'
import FormInput from '@components/formInput/FormInput'

const container = {
  marginTop: '24px'
}
const title = {
  marginBottom: '40px'
}
const inputLabelStyle = theme => ({
  ...theme.typography.loginInput.label
})
const dividerStyle = theme => ({
  margin: '24px 86px 24px',
  [theme.breakpoints.down('s')]: {
    margin: '24px 25px 24px'
  }
})

const LoginLink = ({ onClick, signInUsingPassword }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography variant="loginLink" onClick={onClick}>
        {signInUsingPassword}
      </Typography>
    </Box>
  )
}
LoginLink.propTypes = {
  onClick: PropTypes.func,
  signInUsingPassword: PropTypes.string
}

const LoginWithEmailAndPassForm = ({
  showLogin,
  control,
  onSubmit,
  loginClick,
  handleSubmit,
  loginFetching,
  signInPageUseEmail,
  signInPageUseEmailFieldLabel,
  signInPageUseEmailPasswordFieldLabel,
  signInPageUseEmailSubmit,
  signInEmailLinkInstruction,
  signInUsingPassword
}) => {
  const theme = useTheme()
  return (
    <>
      <FormDivider
        altTheme={dividerStyle(theme)}
        caption={signInEmailLinkInstruction}
      />

      <Box sx={container} data-testid="emailpass">
        {!showLogin && (
          <LoginLink
            onClick={loginClick}
            signInUsingPassword={signInUsingPassword}
          />
        )}

        {showLogin && (
          <>
            <Typography sx={title} variant="formTitle">
              {signInPageUseEmail}
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              data-testid="emailStandardForm"
            >
              <FormInput
                control={control}
                label={signInPageUseEmailFieldLabel}
                data-testid="emailStandard"
                name="emailStandard"
                labelStyle={inputLabelStyle}
              />
              <FormInput
                control={control}
                label={signInPageUseEmailPasswordFieldLabel}
                name="pdValue"
                data-testid="pdValue"
                type="password"
                labelStyle={inputLabelStyle}
              />
              <FormButton
                type="submit"
                data-testid="submit"
                section="loginWithEmailAndPass"
                loading={loginFetching}
                disabled={loginFetching}
              >
                {signInPageUseEmailSubmit}
              </FormButton>
            </form>
          </>
        )}
      </Box>
    </>
  )
}
LoginWithEmailAndPassForm.propTypes = {
  showLogin: PropTypes.bool,
  control: PropTypes.object,
  loginFetching: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  loginClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  signInPageUseEmail: PropTypes.string,
  signInPageUseEmailFieldLabel: PropTypes.string,
  signInPageUseEmailPasswordFieldLabel: PropTypes.string,
  signInPageUseEmailSubmit: PropTypes.string,
  signInEmailLinkInstruction: PropTypes.string,
  signInUsingPassword: PropTypes.string
}
export default LoginWithEmailAndPassForm
