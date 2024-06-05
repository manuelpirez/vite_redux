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
  isMatomoReady,
  setCustomVariable,
  loadMatomoScript,
  trackPageViewAsync
} from '@utils/matomo'
import useGetParams from './useGetParams'

const isEmpty = thing => {
  if (Array.isArray(thing)) {
    return thing.length === 0
  } else if (typeof thing === 'object' && thing !== null) {
    return Object.keys(thing).length === 0
  }
  return false
}

export let initialized = false

/**
 * Objective:
 * - Attempt to abstract Piwik v4.x.x as a "service" to our needs
 *
 * Known issues:
 * - Expected: The callback in a `trackPageView` call (and others) should always be executed, once the tracking Request is sent.
 * - Current: In some circumstances, this is not happening. While testing, It's working in FF, but not in Chrome.
 * - Docs: https://forum.matomo.org/t/wait-for-matomo-request-to-finish-callback-event/45875
 *
 * Summary:
 * - Initialize tracking script
 * - check any deferred tracking actions
 *
 * @returns {{setPageVars: setPageVars, initTrackingScript: ((function(): Promise<boolean>)|*), setCustomTrackingVars: setCustomTrackingVars, track: ((function(String, *, *): Promise<void>)|*)}}
 */
const useTrackingScript = () => {
  // holds a list of actions that were triggered before initialization
  let deferred = []
  // Use tracking.json to get mapped parameters from cache
  const { mergedParams } = useGetParams([
    ...customVariables.page,
    ...customVariables.visit
  ])

  /**
   * Sets tracking variables for Matomo's Page Scope
   *
   * @param patternList
   * @param varsObj
   * @param clearOldVars
   */
  const setPageVars = (patternList, varsObj, clearOldVars = true) => {
    if (clearOldVars) {
      for (let i = 1; i <= pageVarTotal; i++) {
        setCustomVariable(i, '', '', 'page')
      }
    }
    setTrackingVars(patternList, varsObj, 'page')
  }
  /**
   * Iterates over an array looks for a matching key in the obj param
   * Set the values by list in matomo, type defines scope
   *
   * @param {Array} list - a list of values to look for in Obj
   * @param {Object} obj - an object with accepted key -> values
   * @param {String} type - matomo custom var scope
   */
  const setTrackingVars = (list, obj, type) => {
    list.forEach((val, i) => {
      setCustomVariable(i + 1, val, obj[val.toLowerCase()] || '', type)
    })
  }
  /**
   * Ignores patterns and sets unique tracking variables
   * @param customVars
   * @param type
   */
  const setCustomTrackingVars = (customVars, type) => {
    isMatomoReady()
    Object.entries(customVars).forEach(([key, value], i) => {
      setCustomVariable(i, key, value, type)
    })
  }

  /**
   *  Adds Matomo actions to the local deferred list
   *
   * @param {String} action
   * @param {Object} pageVars
   * @param {Object} userData
   */
  const setDeferred = ({ action, pageVars, userData }) => {
    deferred = [...deferred, { action, pageVars, userData }]
  }
  /**
   * Iterates over the deferred actions triggering Matomo tracking for each element
   * @returns {Promise<void>}
   */
  const runDeferred = async () => {
    console.log('TRACK: running deferred tracking')
    for (const { action, pageVars, userData } of deferred) {
      await track(action, pageVars, userData)
    }
  }

  /**
   * Attempts to load the Matomo tracking service
   *
   * @returns {Promise<boolean>}
   */
  const initTrackingScript = async () => {
    try {
      await loadMatomoScript({ siteId, matomoScript })
      !isEmpty(deferred) && (await runDeferred())
      initialized = true
      return true
    } catch (e) {
      console.error('Error initializing tracking service:', e)
      initialized = false
      throw new Error(e)
    }
  }

  /**
   * 1. Saves Page & Visit variables
   * 2. Runs trackPageView
   * 3. Deferred actions in case piwik is not ready
   *
   * @param {String} action
   * @param pageVars
   * @param userData
   * @returns {Promise<void>}
   */
  const track = async (action, pageVars, userData) => {
    try {
      isMatomoReady()
      console.log({ mergedParams })

      // set visit tracking variables
      setTrackingVars(customVariables.visit, mergedParams, 'visit')

      // set page tracking variables - use cache if there are no custom page vars
      setPageVars(
        customVariables.page,
        pageVars ? mergedParams : pageVars,
        true
      )
      // there should be a ML here to add any constant
      // userData &&
      addUserData(userData)

      await trackPageViewAsync(action)
    } catch (e) {
      console.error(e)
      setDeferred({ action, pageVars, userData })
    }
  }

  return {
    track,
    setPageVars,
    setCustomTrackingVars,
    initTrackingScript
  }
}

export default useTrackingScript
