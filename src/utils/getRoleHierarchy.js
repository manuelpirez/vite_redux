import { roleTokenHierarchy } from '@static/roles'

/**
 * Calculates all token IDs from the given roleTokenHierarchy.
 *
 * @param {Array} roleTokenHierarchy - The hierarchy of role token objects.
 * @returns {Array} - An array containing all token IDs.
 */
const allTokenIds = roleTokenHierarchy.reduce((accumulator, currentObject) => {
  const values = Object.values(currentObject)[0]
  return accumulator.concat(values)
}, [])
/**
 * Finds a token ID in a given URL string.
 *
 * @param {Array} valuesToCheck - An array of values to check against. e.g. ['dp', 'otp']
 * @param {string} url - The URL string to search for the token ID. e.g. ...url.com?dp=123
 * @returns {Object} - An object containing the matching token ID and its corresponding value, or undefined if no match is found.
 */
const findTokenIdInString = (valuesToCheck, url) => {
  const urlSearchParams = new URLSearchParams(url.search)

  let matchingParameter = null
  let matchingValue = null
  for (const value of valuesToCheck) {
    if (urlSearchParams.has(value)) {
      matchingParameter = value
      matchingValue = urlSearchParams.get(value)
      break
    }
  }

  if (matchingParameter !== null) {
    return { tokenId: matchingParameter, value: matchingValue }
  } else {
    return { tokenId: undefined, value: undefined }
  }
}
/**
 * Compares a token ID with a role in a role-token hierarchy.
 *
 * @param {string} tokenId - The ID of the token to compare.
 * @param {string} role - The role to compare against.
 * @param {Array} roleTokenHierarchy - The hierarchy of roles and their associated tokens.
 * @returns {boolean} - True if the token ID is lower in the hierarchy than the role, false otherwise.
 */
const compareTokenAndRole = (tokenId, role, roleTokenHierarchy) => {
  const hierarchyIndex = roleTokenHierarchy.findIndex(item => {
    const levels = Object.values(item)[0]
    return levels.includes(tokenId)
  })

  const idIndex = roleTokenHierarchy.findIndex(
    item => Object.keys(item)[0] === role
  )

  return hierarchyIndex < idIndex
}
/**
 * Determines if a given role has a higher token ID than the token ID found in the URL.
 *
 * @param {string} role - The role to check.
 * @param {URL} location - The URL object to search for token IDs.
 * @returns {boolean} - True if the role has a higher token ID hierarchy, false otherwise.
 */
const getRoleHierarchy = (role, location) => {
  const { tokenId } = findTokenIdInString(allTokenIds, location)

  return compareTokenAndRole(tokenId, role, roleTokenHierarchy)
}

export default getRoleHierarchy

// if search param is greater -  do login
// if token login succed - save to cache and update user
// if token login fails - proceed with cache verify

// if search param is not greater
// do cache verify
// cache verify fails - do token login
// if token login fails - logout user
