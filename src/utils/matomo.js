/**
 * This function initializes the Matomo tracking script by setting the site ID and tracker URL,
 * and loads the script asynchronously.
 *
 * @param {Object} options - The options for initializing the tracking script.
 * @param {string} options.siteId - The site ID for the Matomo tracking.
 * @param {string} options.matomoScript - The URL of the Matomo script.
 * @returns {void}
 *
 * @example
 * initTrackingScript({
 *   siteId: '123456',
 *   matomoScript: 'https://example.com/matomo/'
 * });
 *
 * @see {@link https://developer.matomo.org/4.x/guides/tracking-javascript-guide|Matomo 4.x Documentation}
 * @see {@link https://developer.matomo.org/4.x/api-reference/tracking-javascript|Matomo 4.x API Reference}
 */
export const loadMatomoScript = async ({ siteId, matomoScript }) => {
  console.log('MATOMO: loading tracking script')
  window._paq = window._paq || []

  // Add siteId and Piwik tracking URL to global vars
  window._paq.push(['setSiteId', siteId])
  window._paq.push(['setTrackerUrl', matomoScript + 'piwik.php'])

  const scriptElement = document.createElement('script')
  const refElement = document.getElementsByTagName('script')[0]

  scriptElement.type = 'text/javascript'
  scriptElement.defer = true
  scriptElement.async = true
  scriptElement.src = matomoScript + 'piwik.js'
  refElement.parentNode.insertBefore(scriptElement, refElement)

  await new Promise((resolve, reject) => {
    //setTimeout(resolve, 5000) // 5000 milliseconds = 5 seconds
    scriptElement.onload = resolve
    console.log('MATOMO: loaded')
    scriptElement.onerror = reject
  })
}

/**
 * Triggers Matomo's trackPageView action
 * @param action
 * @returns {boolean}
 */
export const trackPageView = action => {
  window._paq.push(['trackPageView', action])
  return true
}

/**
 * Triggers Matomo's trackPageView action and returns a promise
 *
 * @param action
 * @returns {Promise<void>}
 */
export const trackPageViewAsync = async action => {
  await new Promise(resolve => {
    window._paq.push([
      () => {
        const int = setInterval(() => {
          if (trackPageView(action)) {
            console.log('MATOMO: successfully tracked pageView')
            // do whatever you want when Matomo tracked at least one pageView
            clearInterval(int)
            resolve()
          }
        }, 250)
      }
    ])
  })
}

/**
 * Adds data to matomo's user_data complementary object
 * @param userDataObj
 */
export const addUserData = userDataObj => {
  window._paq.push([
    'appendToTrackingUrl',
    `user_data=${encodeURIComponent(JSON.stringify(userDataObj))}`
  ])
}

/**
 * Appends data to main tracking URL
 * @param encodedString
 */
export const appendToTrackingUrl = encodedString => {
  window['_paq'].push(['appendToTrackingUrl', encodedString])
}

/**
 * Sets custom variables for page and visit scope.
 *
 * @param index
 * @param key
 * @param value
 * @param scope
 */
export const setCustomVariable = (index, key, value, scope) => {
  window._paq.push(['setCustomVariable', index, key, value, scope])
}

/**
 * Does a false check on matomo's ready set variable
 *
 * @returns {boolean}
 */
export const isMatomoReady = () => {
  if (!window._paq) {
    throw new Error('Piwik is not initialized')
  } else {
    return true
  }
}