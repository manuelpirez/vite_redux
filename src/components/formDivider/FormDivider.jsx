import PropTypes from 'prop-types'

import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

const formCaption = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center'
}

const DividerLine = styled(Divider, {
  name: 'FormDivider',
  overridesResolver: (props, styles) => [styles.dividerLine]
})(({ theme }) => ({
  color: theme.palette.formDivider.divider,
  '.MuiDivider-wrapper': {
    padding: '0px'
  },
  '::before': {
    borderTopColor: theme.palette.formDivider.divider
  },
  '::after': {
    borderTopColor: theme.palette.formDivider.divider
  }
}))

/**
 * Simple hooked up to the theme divider component with text
 * @param altTheme
 * @param text
 * @param color
 * @param caption
 * @returns {JSX.Element}
 */
const FormDivider = ({ altTheme, text = 'or', color = 'primary', caption }) => {
  const {
    components: {
      FormDivider: {
        styleOverrides: { dividerContainer, dividerText }
      }
    }
  } = useTheme()
  return (
    <>
      {caption && (
        <Typography sx={formCaption} variant="formCaption">
          {caption}
        </Typography>
      )}
      <Box
        sx={{
          ...dividerContainer,
          ...altTheme
        }}
      >
        <DividerLine>
          <Box
            sx={{
              color: `formDivider.${color}`,
              ...dividerText
            }}
          >
            {text}
          </Box>
        </DividerLine>
      </Box>
    </>
  )
}
FormDivider.propTypes = {
  /**
   * sx prop applied to the container
   */
  altTheme: PropTypes.object,
  /**
   * middle text
   */
  text: PropTypes.string,
  /**
   * Text above the divider
   */
  caption: PropTypes.string,
  /**
   * text color
   */
  color: PropTypes.oneOf(['primary', 'secondary'])
}
export default FormDivider
