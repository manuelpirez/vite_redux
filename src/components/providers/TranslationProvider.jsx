import PropTypes from 'prop-types'
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { resources } from '@static/locale.json'

i18n.use(initReactI18next).init({
  debug: true,
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  missingKeyHandler: (lng, ns, key, fallbackValue) => {
    console.warn(lng, ns, key, fallbackValue)
  }
})

const TranslationProvider = ({ children }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
TranslationProvider.propTypes = {
  children: PropTypes.node.isRequired
}
export default TranslationProvider
