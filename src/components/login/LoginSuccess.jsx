import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import Page from '@components/Page'

import { sections } from '@config'

const {
  login: {
    LoginWithEmailTitle,
    LoginWithEmailText,
    LoginWithEmailContactUs: { contactUslink, text }
  }
} = sections

const containerStyle = {
  marginTop: '24px',
  marginBottom: '24px',
  paddingBottom: '10px'
}

const LoginSuccess = () => {
  const { t } = useTranslation()

  return (
    <Page
      title={t(LoginWithEmailTitle)}
      showFeedback={false}
      data-testid="success"
    >
      <Box sx={containerStyle}>
        <Typography variant="body1">
          {t(LoginWithEmailText)}&nbsp;
          <Link to={contactUslink}>{t(text)}</Link>
        </Typography>
      </Box>
    </Page>
  )
}
export default LoginSuccess
