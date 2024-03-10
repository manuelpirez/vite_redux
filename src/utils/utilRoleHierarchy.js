import { roleTokenHiearchy } from '@static/roles'

const allTokenIds = roleTokenHiearchy.reduce((accumulator, currentObject) => {
  const values = Object.values(currentObject)[0]
  return accumulator.concat(values)
}, [])

const findTokenIdInString = (valuesToCheck, url) => {
  // Extract parameters from the URL 'https://www.google.com?dp=123'
  // Array of values to check against ['dp']
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

const compareTokenAndRole = (tokenId, role, roleTokenHiearchy) => {
  const hierarchyIndex = roleTokenHiearchy.findIndex(item => {
    const levels = Object.values(item)[0]
    return levels.includes(tokenId)
  })

  const idIndex = roleTokenHiearchy.findIndex(
    item => Object.keys(item)[0] === role
  )

  return hierarchyIndex < idIndex
}
/**
 *
 * @param {string} role
 * @param {Location} location
 * @returns
 */
const utilRoleHierarchy = (role, location) => {
  // get all token ids
  // find if thr URL contains any of the token IDs
  const { tokenId } = findTokenIdInString(allTokenIds, location)

  return compareTokenAndRole(tokenId, role, roleTokenHiearchy)
}

export default utilRoleHierarchy
