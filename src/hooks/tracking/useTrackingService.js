import {
  piwikCustomVars,
  customVarTotal
  //  matomoWhitelistParams,
  //  googleWhitelistParams
} from '@static/tracking.json'
import { tracking } from '@config'

const piwikEnabled = tracking.piwikEnabled
const schema = tracking.schema
let newVisit = true
let initialized = false
let _piwikCustomVars = piwikCustomVars
let deferred = []
let firstActionSent = false

/**
 * Can be standalone
 *
 * tracking is a service that handles tracking and analytics functionality.
 * It provides methods for initializing tracking variables, tracking actions and events,
 * and managing deferred tracking.
 *
 * @param {SessionService} SessionService - The session service used for caching values.
 * @returns {Object} - An object containing the TrackingService methods.
 */
const useTrackingService = SessionService => ({
  /**
   * @param {boolean} val - The new value for the 'initialized' variable.
   */
  setInitialized(val) {
    initialized = val
  },
  /**
   * @param {boolean} val - The new value for the 'newVisit' variable.
   */
  setNewVisit(val) {
    newVisit = val
  },
  /**
   * @param {Array} val - The new value for the 'deferred' variable.
   */
  setDeferred(val) {
    deferred = val
  },
  /**
   * @param {boolean} val - The new value for the 'firstActionSent' variable.
   */
  setFirstAction(val) {
    firstActionSent = val
  },

  /**
   * Initializes the tracking variables for Piwik.
   *
   * If Piwik is not enabled, the method returns early.
   *
   * Sets the custom variables for Piwik.
   * Runs any deferred tracking actions.
   * Registers the Media Analytics tracker.
   */
  initializeTrackingVars() {
    if (piwikEnabled === 'false') {
      return
    }
    _piwikCustomVars = piwikCustomVars
    this.setTrackerVars()
    this.runDeferred()
    this.registerMATracker()
  },
  /**
   * Initializes the tracking script.
   *
   * @param {Object} options - The options for initializing the tracking script.
   * @param {string} options.url - The URL of the tracking script.
   * @param {string} options.piwikSiteId - The site ID for Piwik.
   * @param {string} options.scriptName - The name of the tracking script.
   * @param {string} [options.scriptUrl=''] - The URL of the tracking script.
   * @param {boolean} [options.secure=false] - Indicates if the tracking script should be loaded securely.
   *
   * @returns {void}
   */
  initializeTrackingScript({
    url,
    piwikSiteId,
    scriptName,
    scriptUrl = '',
    secure = false
  }) {
    window._paq = window._paq || []

    url = transformTrackingUrl(url, secure)

    // Add siteId and Piwik tracking URL to global vars
    window._paq.push(['setSiteId', piwikSiteId])
    window._paq.push(['setTrackerUrl', url])

    const scriptElement = document.createElement('script')
    const refElement = document.getElementsByTagName('script')[0]

    scriptElement.type = 'text/javascript'
    scriptElement.defer = true
    scriptElement.async = true
    scriptElement.src = '' + (scriptUrl || url) + scriptName
    refElement.parentNode.insertBefore(scriptElement, refElement)

    this.setInitialized(true)
  },

  /**
   * Sets the custom tracker vars from cached session values up to the maximum `customVarTotal`
   * Only sets tracker vars once
   *
   * @throws {Error} If Piwik is not initialized.
   */
  setTrackerVars() {
    if (!initialized) throw new Error('Piwik not initialized')
    let i = 1
    for (const key in _piwikCustomVars) {
      const cachedValue = SessionService.getFromCache(_piwikCustomVars[key], 0)
      this.setCustomVariable(i++, _piwikCustomVars[key], cachedValue, 'visit')
    }
  },
  /**
   * Track an action with optional parameters and user data.
   *
   * @param {string} action - The action to track.
   * @param {Object} params - Optional parameters for the action, (should never be more than 10 at a time).
   * @param {Object} user_data - User data associated with the action, (Accepts a Big JSON OBJ, go wild...).
   */
  track(action, params = {}, user_data = {}) {
    if (piwikEnabled === 'false') {
      return
    }

    // Delays tracking actions in case Piwik is not fully initialized
    if (!initialized) {
      return this.deferTrack({ action, params, user_data })
    }

    // Force/Sets new visit flags
    if (newVisit) {
      this.forceNewVisit()
      this.setNewVisit(false)
    } else {
      this.cleanForceNewVisit()
    }

    // UPDATE session vars
    this.setTrackerVars()

    // Clear old 'page' values.
    let i = 1
    for (i; i <= customVarTotal; i++) {
      this.setCustomVariable(i, '', '', 'page')
    }

    // Push new 'page' values.
    i = 1
    for (let [key, value] of Object.entries(params)) {
      this.setCustomVariable(i++, key, value, 'page')
    }

    // Detect first action & attach whitelisted params
    // or, Clean unwanted params
    if (!firstActionSent) {
      this.buildWhitelistedURL()
      this.setFirstAction(true)
    } else {
      this.updateUrl(window.location.href.split('?')[0])
    }

    // Append 'user_data' to piwik.php url if any
    this.appendToTrackingUrl(
      `user_data=${encodeURIComponent(JSON.stringify(user_data))}`
    )

    // Track page view
    this.trackPageview(action)
  },

  /**
   * Sets the 'new_visit' parameter in the tracking URL to force a new visit.
   * This method is a direct usage of the Piwik API.
   *
   * @throws {Error} If Piwik is not initialized.
   *
   * @example
   * forceNewVisit();
   */
  forceNewVisit() {
    if (!initialized) throw new Error('Piwik not initialized')
    // This is a direct usage of the Piwik API.
    // We can move this to @psl/Piwik lib
    // Ref: https://developer.matomo.org/guides/tracking-javascript#configuration-of-the-tracker-object
    window._paq.push(['appendToTrackingUrl', 'new_visit=1'])
    window._paq.push(['deleteCookies'])
  },
  /**
   * Clears the force new visit parameter from the tracking URL.
   *
   * @throws {Error} If Piwik is not initialized.
   */
  cleanForceNewVisit() {
    if (!initialized) throw new Error('Piwik not initialized')
    // This is a direct usage of the Piwik API.
    // We can move this to @psl/Piwik lib
    // Ref: https://developer.matomo.org/guides/tracking-javascript#configuration-of-the-tracker-object
    window._paq.push(['appendToTrackingUrl', ''])
  },
  trackEvent(action) {
    if (!initialized) throw new Error('Piwik not initialized')
    // This is a direct usage of the Piwik API.
    // We can move this to @psl/Piwik lib
    // Ref: https://developer.matomo.org/guides/tracking-javascript#configuration-of-the-tracker-object
    window['_paq'].push(['trackEvent', action])
  },
  updateUrl(url) {
    if (!initialized) throw new Error('Piwik not initialized')
    // This is a direct usage of the Piwik API.
    // We can move this to @psl/Piwik lib
    // Ref: https://developer.matomo.org/guides/tracking-javascript#configuration-of-the-tracker-object
    window['_paq'].push(['setCustomUrl', url])
  },
  trackPageview(action) {
    if (!initialized) throw new Error('Piwik not initialized')
    // This is a direct usage of the Piwik API.
    // We can move this to @psl/Piwik lib
    // Ref: https://developer.matomo.org/guides/tracking-javascript#configuration-of-the-tracker-object
    window['_paq'].push(['trackPageView', action])
  },
  appendToTrackingUrl(encodedString) {
    if (!initialized) throw new Error('Piwik not initialized')
    // This is a direct usage of the Piwik API.
    // We can move this to @psl/Piwik lib
    // Ref: https://developer.matomo.org/guides/tracking-javascript#configuration-of-the-tracker-object
    window['_paq'].push(['appendToTrackingUrl', encodedString])
  },
  /**
   * @param {number} slot
   * @param {string} id
   * @param {string} value
   * @param {string} scope - The scope of the custom variable ('visit' or 'page').
   * @returns {void}
   */
  setCustomVariable(slot, id, value, scope) {
    window._paq.push(['setCustomVariable', slot, id, value, scope])
  },
  /**
   * Defers an action to be tracked after initialization
   *
   * @param action
   * @param params – should never be more than 10 at a time
   * @param user_data
   * @returns the number of actions to be tracked after intialization
   */
  deferTrack({ action, params, user_data }) {
    return this.setDeferred([...deferred, { action, params, user_data }])
  },
  /**
   * Runs all deferred tracking actions in the `deferred` array
   *
   * @returns void
   */
  runDeferred() {
    deferred.forEach(({ action, params, user_data }) => {
      this.track(action, params, user_data)
    })
  },
  // Ignore this function test since it's a matomo required code
  /* istanbul ignore next */
  registerMATracker() {
    window.matomoMediaAnalyticsAsyncInit = () => {
      if (!window['Matomo']) return
      const MA = window['Matomo']['MediaAnalytics']
      if (!MA) return
      MA.removePlayer('html5')
      const { video } = schema
      const HTML5Player = (node, mediaType) => {
        // in this class we track interactions with the player
        // instance is created whenever a media for this player was found
        if (node.playerInstantiated) {
          // prevent creating multiple trackers for the same media
          // when scanning for media multiple times
          return
        }
        node.playerInstantiated = true

        const actualResource = MA.element.getAttribute(node, 'src')
        const resource = MA.element.getMediaResource(node, actualResource)
        const title = MA.element.getMediaTitle(node)

        MA.getMatomoTrackers()[0].trackPageView(video.action)

        const videoTracker = new MA.MediaTracker(
          'HTML5Player',
          mediaType,
          resource
        )

        videoTracker.setWidth(node.clientWidth)
        videoTracker.setHeight(node.clientHeight)
        videoTracker.setFullscreen(MA.element.isFullscreen(node))
        videoTracker.setMediaTitle(title)
        videoTracker.setMediaTotalLengthInSeconds(node.duration)
        const useCapture = true
        node.addEventListener(
          'play',
          () => {
            const elementResource = MA.element.getAttribute(node, 'src')
            const rsrc = MA.element.getMediaResource(node, elementResource)
            videoTracker.setResource(rsrc)
            videoTracker.setMediaTitle(`media/${title}`)
            videoTracker.play()
          },
          useCapture
        )

        node.addEventListener(
          'pause',
          () => {
            const elementResource = MA.element.getAttribute(node, 'src')
            const rsrc = MA.element.getMediaResource(node, elementResource)
            videoTracker.setResource(rsrc)
            videoTracker.setMediaTitle(`media/${title}`)
            videoTracker.pause()
          },
          useCapture
        )

        node.addEventListener('ended', () => videoTracker.finish(), useCapture)

        node.addEventListener(
          'emptied',
          () => videoTracker.finish(),
          useCapture
        )

        node.addEventListener(
          'timeupdate',
          () => {
            videoTracker.setMediaProgressInSeconds(node.currentTime)
            videoTracker.setMediaTotalLengthInSeconds(node.duration)
            videoTracker.update()
          },
          useCapture
        )

        node.addEventListener('seeking', () => videoTracker.seekStart(), true)

        node.addEventListener(
          'seeked',
          () => {
            videoTracker.setMediaProgressInSeconds(node.currentTime)
            videoTracker.setMediaTotalLengthInSeconds(node.duration)
            videoTracker.seekFinish()
          },
          useCapture
        )

        node.addEventListener('abort', () => videoTracker.finish())

        window.addEventListener(
          'resize',
          () => {
            videoTracker.setWidth(node.clientWidth)
            videoTracker.setHeight(node.clientHeight)
            videoTracker.setFullscreen(MA.element.isFullscreen(node))
          },
          useCapture
        )

        videoTracker.trackUpdate()
      }

      HTML5Player.scanForMedia = documentOrHTMLElement => {
        const html5Videos = documentOrHTMLElement.getElementsByTagName('video')

        for (let html5Video of html5Videos) {
          if (!MA.element.isMediaIgnored(html5Video)) {
            HTML5Player(html5Video, MA.mediaType.VIDEO)
          }
        }
      }
      MA.addPlayer('HTML5Player', HTML5Player)
    }
  },

  /**
   * Builds a whitelisted URL by filtering out parameters that are not in the whitelisted array.
   *
   * @returns {void}
   */
  buildWhitelistedURL() {
    /*
    // Combine the whitelisted parameters from Matomo and Google into a single array
    const whiteListParams = [...matomoWhitelistParams, ...googleWhitelistParams]
    // Get URL params from redux
    const params = getState().trackingReducer?.path

    // Parse URL params using the `queryString` library
    const parsedParams = !isEmpty(params) ? queryString.parse(params) : {}
    if (isEmpty(parsedParams)) return

    // Filter out any parameters that are not in the whitelisted array
    const finalParsedParams = Object.keys(parsedParams).reduce((prev, curr) => {
      if (whiteListParams.includes(curr)) {
        return { ...prev, [curr]: parsedParams[curr] }
      }
      return prev
    }, {})

    // Update Action URL with new URL params
    const baseUrl = window.location.href.split('?')[0]
    const updatedUrl = `${baseUrl}?${queryString.stringify(finalParsedParams)}`
    this.updateUrl(updatedUrl)*/
  }
})

const transformTrackingUrl = (url, secure = false) => {
  if (url.indexOf('//') === -1) {
    url = secure === true ? 'https://' + url + '/' : 'http://' + url + '/'
  }
  if (url.indexOf('.php') === -1) {
    url = url + 'piwik.php'
  }
  return url
}

//const isEmpty = obj => {
//  return Object.keys(obj).length === 0 && obj.constructor === Object
//}

export default useTrackingService
