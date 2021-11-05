// build your `/api/resources` router here
const router = require('express').Router()
const Resources = require('./model')

router.get('/', (req, res, next) => {
    Resources.getAll()
      .then(resources => {
        res.json(resources)
      })
      .catch(next)
})

router.post('/', (req, res, next) => {
    const resource = req.body
    Resources.add(resource)
      .then(resource => {
          res.status(201).json(resource)
      })
      .catch(next)
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the resource router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router