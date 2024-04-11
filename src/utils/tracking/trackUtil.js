import {
  customVariables,
  pageVarTotal,
  matomoScript,
  siteId
  //  matomoWhitelistParams,
  //  googleWhitelistParams
} from '@static/tracking.json'
import {
  addUserData,
  isPiwikReady,
  setCustomVariable,
  loadMatomoScript,
  trackPageViewAsync
} from '@utils/tracking/matomo'
// import useGetParams from '@hooks/useGetParams'
// setup
// change customVariables.page to array
// change tracking util to hook
// attach cache to track map
export let initialized = false
let deferred = []

/**
 * Attempt to abstract Piwik v4.x.x as a "service" to our needs
 *
 * Known issues:
 * Expected: The callback in a `trackPageView` call (and others) should always be executed, once the tracking Request is sent.
 * Current: In some circumstances, this is not happening. While testing, It's working in FF, but not in Chrome.
 * Docs: https://forum.matomo.org/t/wait-for-matomo-request-to-finish-callback-event/45875
 * ---
 * Initialize tracking script
 * check any deferred tracking actions
 *
 * @returns boolean
 */
const initTrackingScript = async () => {
  try {
    await loadMatomoScript({ siteId, matomoScript })
    // console.log('TRACK: script loaded')
    !isEmpty(deferred) && (await runDeferred())
    // console.log('TRACK: deferred executed')
    initialized = true
  } catch (e) {
    console.error('Error initializing tracking service:', e)
    initialized = false
    throw new Error(e)
  }
  return initialized
}

/**
 * Saves Page & Visit varialbles
 * Runs trackPageView
 * Deferres actions in case piwik is not ready
 *
 * @param {String} action
 * @param {Object} pageVars
 * @param {Object} userData
 * @param {Boolean} updateCacheTrackingVars
 */
export const track = async (
  action,
  pageVars,
  userData
  // updateCacheTrackingVars = false
) => {
  try {
    isPiwikReady()

    // updateCacheTrackingVars &&
    setCacheTrackingVars(customVariables.visit, 'visit')
    // pageVars &&
    setPageVars(pageVars ? customVariables.page : pageVars)
    // userData &&
    // there should be a ML here to add any constant
    addUserData(userData)

    await trackPageViewAsync(action)
  } catch (e) {
    console.error(e)
    setDeferred({ action, pageVars, userData })
  }
}

// pre-tracking
const setPageVars = (pageVars, clearOldVars = true) => {
  if (clearOldVars) {
    for (let i = 1; i <= pageVarTotal; i++) {
      setCustomVariable(i, '', '', 'page')
    }
  }
  // set new entries
  Object.entries(pageVars).forEach(([key, value], index) => {
    console.log({ key, value })
    setCustomVariable(index + 1, key, value, 'page')
  })
}
const setCacheTrackingVars = (customVars, type) => {
  customVars.forEach((key, index) => {
    // const cachedValue = SessionService.getFromCache(value, 0)
    const cachedValue = `visit${Math.floor(Math.random() * 100)}`
    setCustomVariable(index + 1, key, cachedValue, type)
    //window._paq.push(['setCustomVariable', index + 1, value, cachedValue, type])
  })
}
export const setCustomTrackingVars = (customVars, type) => {
  isPiwikReady()
  Object.entries(customVars).forEach(([key, value], i) => {
    setCustomVariable(i, key, value, type)
  })
}

// deferred
const setDeferred = ({ action, pageVars, userData }) => {
  deferred = [...deferred, { action, pageVars, userData }]
}
const runDeferred = async () => {
  console.log('TRACK: running deferred tracking')
  for (const { action, pageVars, userData } of deferred) {
    await track(action, pageVars, userData)
  }
}

// misc
const isEmpty = thing => {
  if (Array.isArray(thing)) {
    return thing.length === 0
  } else if (typeof thing === 'object' && thing !== null) {
    return Object.keys(thing).length === 0
  }
  return false
}

export default initTrackingScript
