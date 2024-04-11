import { useSelector } from 'react-redux'

import { selectPersistParamsByKey } from '@features/urlPersistParamsSlice'
import { selectParamsByKey } from '@features/urlParamsSlice'

const useGetParams = (keys = []) => {
  const persistParams =
    useSelector(state =>
      selectPersistParamsByKey(
        state,
        keys.map(key => key.toLowerCase())
      )
    ) || {}
  const params =
    useSelector(state =>
      selectParamsByKey(
        state,
        keys.map(key => key.toLowerCase())
      )
    ) || {}

  const mergedParams = { ...params, ...persistParams }

  return { mergedParams, persistParams, params }
}

export default useGetParams
