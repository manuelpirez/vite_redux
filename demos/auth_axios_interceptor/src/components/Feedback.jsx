import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import useApiPublic from '../hooks/interceptors/useApiPublic.jsx'
import useTracking from '../hooks/useTracking.jsx'

const FEEDBACK_URL = '/user_feedback'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const Feedback = () => {
  const userRef = useRef()
  const errRef = useRef()
  const api = useApiPublic()
  const { trackSubmitAction } = useTracking()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [pwd, setPwd] = useState('')
  const [matchPwd, setMatchPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setValidName(USER_REGEX.test(user))
  }, [user])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchPwd])

  const handleSubmit = async e => {
    e.preventDefault()
    trackSubmitAction({ action: 'feedback' })
    // if button enabled with JS hack
    if (!USER_REGEX.test(user)) {
      setErrMsg('Invalid Entry')
      return
    }
    try {
      const response = await api.post(FEEDBACK_URL, { user })
      console.log(response?.data)
      setSuccess(true)
      //clear state and controlled inputs
      setUser('')
      setPwd('')
      setMatchPwd('')
    } catch (err) {
      console.log(err)
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 409) {
        setErrMsg('error 409')
      } else {
        setErrMsg('Feedback failed')
      }
    }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/linkpage">Links</Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Feedback</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <p style={{ color: validName ? 'green' : 'red' }}>
                {validName ? 'valid' : 'invalid'}
              </p>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={e => setUser(e.target.value)}
              value={user}
              required
              aria-describedby="uidnote"
            />

            <button>Submit</button>
          </form>
          <p>
            <span className="line">
              <Link to="/login">Log In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  )
}

export default Feedback
