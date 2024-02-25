import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { setPersistParams } from '@features/params/urlPersistParamsSlice.js'
import { setParams } from '@features/params/urlParamsSlice.js'
import { useCallback, useEffect } from 'react'

const useSaveUrlParams = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const saveParams = useCallback(() => {
    dispatch(setParams(location.search))
    dispatch(setPersistParams(location.search))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => saveParams(), [saveParams])
}

export default useSaveUrlParams
