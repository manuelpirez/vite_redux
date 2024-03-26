/* eslint-disable no-undef */
const mockdb = require('../static/mockdb.json')
const {
  tokenVerify,
  tokenGet,
  tokenRefresh
} = require('../../src/static/endpoints.json')

let count = 0

module.exports = app => {
  softFailEven(app)
  //softNoFail(app)
  //verifyRefresh403(app)
}

const softFailEven = (app, timeOut = 2000) => {
  app.post(tokenGet, (req, res) => {
    console.log(tokenGet)
    res.json({ ...mockdb.tokenGetAnon })
  })

  // fail every even run
  app.post(tokenVerify, (req, res) => {
    console.log(tokenVerify)
    count++
    if (count % 2) {
      setTimeout(() => {
        res.status(403).send('You do not have rights to visit this page')
      }, timeOut)
    } else {
      res.json({ ...mockdb.token_verify_soft })
    }
  })

  app.get(tokenRefresh, (req, res) => {
    console.log(tokenRefresh)
    res.json({ ...mockdb.tokenRefresh })
  })
  app.post(tokenRefresh, (req, res) => {
    console.log(tokenRefresh)
    setTimeout(() => {
      res.json({ ...mockdb.tokenRefresh })
    }, timeOut)
  })
}
// const softNoFail = app => {
//   app.post(tokenGet, (req, res) => {
//     console.log(tokenGet)
//     res.json({ ...mockdb.tokenGetAnon })
//   })

//   // fail every even run
//   app.post(tokenVerify, (req, res) => {
//     console.log(tokenVerify)
//     res.json({ ...mockdb.token_verify_soft })
//   })

//   app.get(tokenRefresh, (req, res) => {
//     console.log(tokenRefresh)
//     res.json({ ...mockdb.tokenRefresh })
//   })
//   app.post(tokenRefresh, (req, res) => {
//     console.log(tokenRefresh)
//     res.json({ ...mockdb.tokenRefresh })
//   })
// }
// const authNoFail = app => {
//   app.post(tokenGet, (req, res) => {
//     console.log(tokenGet)
//     res.json({ ...mockdb.tokenGetAnon })
//   })
//   // fail every even run
//   app.post(tokenVerify, (req, res) => {
//     console.log(tokenVerify)
//     res.json({ ...mockdb.tokenVerifyAuth })
//   })
//   app.get(tokenRefresh, (req, res) => {
//     console.log(tokenRefresh)
//     res.json({ ...mockdb.tokenRefresh })
//   })
//   app.post(tokenRefresh, (req, res) => {
//     console.log(tokenRefresh)
//     res.json({ ...mockdb.tokenRefresh })
//   })
// }
// const verifyRefresh403 = app => {
//   app.post(tokenGet, (req, res) => {
//     console.log(tokenGet)
//     res.json({ ...mockdb.tokenGetAnon })
//   })
//   app.post(tokenVerify, (req, res) => {
//     res.status(403).send('You do not have rights to visit this page')
//   })
//   app.get(tokenRefresh, (req, res) => {
//     console.log(tokenRefresh)
//     res.json({ ...mockdb.tokenRefresh })
//   })
//   app.post(tokenRefresh, (req, res) => {
//     console.log(tokenRefresh)
//     res.status(403).send('You do not have rights to visit this page')
//   })
// }
