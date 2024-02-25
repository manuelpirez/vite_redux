import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'

import FormControl from '@mui/material/FormControl'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'

import FormInputHelper from '@ui/FormInputHelper'

/**
 * react-hook-form MUI integration
 * @param name
 * @param control
 * @param label
 * @param rest
 * @returns {JSX.Element}
 */
export const FormCheckBox = ({ name, control, label, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          <FormControl>
            <FormControlLabel
              label={<Typography variant="checkboxLabel">{label}</Typography>}
              control={
                <Checkbox checked={value} onChange={onChange} {...rest} />
              }
            />
            <FormInputHelper error={error ? error.message : null} />
          </FormControl>
        </div>
      )}
    />
  )
}
FormCheckBox.propTypes = {
  /**
   * input name
   */
  name: PropTypes.string,
  /**
   * react-hook-form useForm control
   */
  control: PropTypes.any,
  /**
   * top label
   */
  label: PropTypes.string
}
export default FormCheckBox
