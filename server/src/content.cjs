/* eslint-disable no-undef */
const mockdb = require('../static/mockdb.json')
const { river, search, article } = require('../../src/static/endpoints.json')

module.exports = app => {
  app.post(river, (req, res) => {
    console.log(river)
    res.json({ ...mockdb.river })
  })

  app.post(search, (req, res) => {
    console.log(search)
    res.json({ ...mockdb.search })
  })
  // search deny access every even number
  // let count = 0
  //app.post(search, (req, res) => {
  //  console.log(search)
  //  count++
  //  if (count % 2) {
  //    res.status(403).send('You do not have rights to visit this page')
  //  } else {
  //    res.json({ ...mockdb.search })
  //  }
  //})

  app.post(article, (req, res) => {
    console.log(article)
    res.json({ ...mockdb.article })
  })

  app.get(`${search}/:id`, (req, res) => {
    const id = req.params.id
    console.log(`${search}/${id}`)
    const result = { ...mockdb.search }.results.find(item => item.id === id)
    if (result) {
      res.json(result)
    } else {
      res.status(404).json({ error: 'Item not found' })
    }
  })

  app.delete(`${search}/:id`, (req, res) => {
    console.log(search)
    const id = req.params.id
    const title = req.body.title
    const newMock = { ...mockdb.search_results }

    const result = newMock.results.filter(item => item.id === id)

    if (result) {
      result.title = title
      res.json(result)
    } else {
      res.status(404).json({ error: 'Item not found' })
    }
  })
}
