import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import FormButton from '@ui/FormButton'
import FormInput from '@ui/FormInput'
import FormCheckBox from '@ui/FormCheckBox'
import FormDropDown from '@ui/FormDropDown'

const titleContainer = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '19px'
}

const Container = styled(Box, {
  name: 'Registration',
  overridesResolver: (props, styles) => [styles.container]
})(() => {})

const Checkbox = styled(FormCheckBox, {
  name: 'Registration',
  overridesResolver: (props, styles) => [styles.checkbox]
})(() => {})

const inputLabelStyle = theme => ({
  marginTop: '8px',
  ...theme.typography.loginInput.label
})

const Dropdown = styled(FormDropDown)(({ theme }) => ({
  '.MuiOutlinedInput-input': {
    ...theme.typography.registrationDropdown
  }
}))

const RegisterBtn = styled(FormButton, {
  name: 'Registration',
  overridesResolver: (props, styles) => [styles.button]
})(() => {})

const RegistrationForm = ({
  handleSubmit,
  onSubmit,
  mapInputItems,
  control,
  isLoading,
  registrationHeader,
  registrationDescription,
  registrationPrivacy,
  registrationRegisterButton
}) => {
  return (
    <Container data-testid="registration">
      <Box sx={titleContainer}>
        <Typography variant="formTitle">{registrationHeader}</Typography>
        <Typography
          variant="formSubtitle"
          sx={theme => ({
            fontSize: theme.typography.formSubtitle.fontSizeSecondary
          })}
        >
          {registrationDescription}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {mapInputItems.map(item => {
          if (item.options) {
            return (
              <Dropdown
                control={control}
                key={item.name}
                data-testid={item.name}
                disabled={isLoading}
                {...item}
              />
            )
          } else {
            return (
              <FormInput
                control={control}
                key={item.name}
                data-testid={item.name}
                disabled={isLoading}
                labelStyle={inputLabelStyle}
                {...item}
              />
            )
          }
        })}
        <Checkbox
          name="toggle"
          data-testid="toggle"
          label={registrationPrivacy}
          control={control}
          disabled={isLoading}
        />
        <RegisterBtn
          type="submit"
          data-testid="submit"
          section="registration"
          loading={isLoading}
          disabled={isLoading}
        >
          {registrationRegisterButton}
        </RegisterBtn>
      </form>
    </Container>
  )
}
RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  mapInputItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      options: PropTypes.object,
      placeholder: PropTypes.string
    })
  ).isRequired,
  control: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  registrationHeader: PropTypes.string.isRequired,
  registrationDescription: PropTypes.string.isRequired,
  registrationPrivacy: PropTypes.string.isRequired,
  registrationRegisterButton: PropTypes.string.isRequired
}
export default RegistrationForm
