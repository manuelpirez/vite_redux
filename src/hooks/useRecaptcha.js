import { useEffect } from 'react'
import { environment } from '@config'
/**
 * Recaptcha Hook, allow us to reuse the recaptcha script logic through the project
 * @param {boolean} condition - condition to allow the script to be loaded
 * @param {function} callback - callback function that will run after loading the script
 */
const useRecaptcha = (condition = true, callback) => {
  //useEffect to load the recaptcha script and remove it when moving out from the component
  useEffect(() => {
    const recaptchaId = 'recaptcha-key'
    const loadScriptByURL = (id, url, callback) => {
      const scriptExist = document.getElementById(id)

      if (!scriptExist && condition) {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url
        script.id = id
        script.onload = function () {
          if (callback) callback()
        }
        document.body.appendChild(script)
      }

      if (scriptExist && callback) callback()
    }

    // load the script by passing the URL
    loadScriptByURL(
      recaptchaId,
      `https://www.google.com/recaptcha/api.js?render=${environment.recaptchaKey}`,
      callback
    )

    return () => {
      const scriptExist = document.getElementById(recaptchaId)
      if (scriptExist) {
        const [grecaptchaBadge] =
          document.body.getElementsByClassName('grecaptcha-badge')

        if (grecaptchaBadge && grecaptchaBadge.style)
          grecaptchaBadge.style.opacity = 0

        scriptExist.remove()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition])

  //useEffect to show the recaptcha badge when moving into the component
  useEffect(() => {
    const [grecaptchaBadge] =
      document.body.getElementsByClassName('grecaptcha-badge')

    if (grecaptchaBadge && grecaptchaBadge.style)
      grecaptchaBadge.style.opacity = 100
  })
}

export default useRecaptcha
