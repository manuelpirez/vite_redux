/* eslint-disable no-undef */
const mockdb = require('../static/mockdb.json')
const {
  tokenVerify,
  tokenGet,
  tokenRefresh
} = require('../../src/static/endpoints.json')

let count = 0
module.exports = app => {
  app.post(tokenGet, (req, res) => {
    console.log(tokenGet)
    res.json({ ...mockdb.tokenGetAnon })
  })
  // no fail
  //app.post(tokenVerify, (req, res) => {
  //  console.log(tokenVerify)
  //  setTimeout(() => {
  //    res.json({ ...mockdb.tokenVerifyAuth })
  //  }, '2000')
  //})
  // fail every even run
  app.post(tokenVerify, (req, res) => {
    console.log(tokenVerify)
    count++
    if (count % 2) {
      setTimeout(() => {
        res.status(403).send('You do not have rights to visit this page')
      }, '2000')
    } else {
      res.json({ ...mockdb.token_verify_soft })
    }
  })
  // test soft to auth
  // app.post(tokenVerify, (req, res) => {
  //   console.log(tokenVerify)
  //   count++
  //   if (count % 2) {
  //     res.json({ ...mockdb.token_verify_soft })
  //   } else {
  //     res.json({ ...mockdb.tokenVerifyAuth })
  //   }
  // })
  app.get(tokenRefresh, (req, res) => {
    console.log(tokenRefresh)
    res.json({ ...mockdb.tokenRefresh })
  })
  app.post(tokenRefresh, (req, res) => {
    console.log(tokenRefresh)
    setTimeout(() => {
      res.json({ ...mockdb.tokenRefresh })
    }, '2000')
    //res.status(403).send('You do not have rights to visit this page')
  })
}
