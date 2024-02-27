/* eslint-disable no-undef */
const mockdb = require('../static/mockdb.json')
const {
  postComments,
  getComments,
  score
} = require('../../src/static/endpoints.json')

module.exports = app => {
  app.get(getComments, (req, res) => {
    console.log(getComments)
    res.json({ ...mockdb.getComments })
  })
  app.post(postComments, (req, res) => {
    console.log(postComments)
    res.json({ ...mockdb.postComments })
  })
  app.post(score, (req, res) => {
    console.log(score)
    res.json({ ...mockdb.score })
  })
}
