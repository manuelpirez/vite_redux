/* eslint-disable no-undef */
const mockdb = require('../static/mockdb.json')
const endpoints = require('../../src/static/endpoints.json')

// let count = 0
module.exports = app => {
  app.post(endpoints.userLogin, (req, res) => {
    console.log(endpoints.emailLogin)
    res.json({ ...mockdb.userLogin })
  })

  app.post(endpoints.logout, (req, res) => {
    console.log(endpoints.logout)
    res.json({ ...mockdb.userLogout })
  })
  // request otp
  app.post(endpoints.otp, (req, res) => {
    console.log(endpoints.otp)
    setTimeout(() => {
      res.json({ ...mockdb.userOtp })
    }, '2000')
  })
  app.post(endpoints.registration, (req, res) => {
    console.log(endpoints.registration)
    setTimeout(() => {
      res.json({ ...mockdb.userRegistration })
    }, '2000')
  })
  app.post(endpoints.feedback, (req, res) => {
    console.log(endpoints.feedback)
    res.json({ ...mockdb.userFeedback })
  })
}
