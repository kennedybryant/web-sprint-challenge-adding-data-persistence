// build your `/api/tasks` router here
const router = require('express').Router()
const tasks = require('./model')

router.get('/', (req, res, next) => {
    tasks.getAll()
      .then(tasks => {
        res.json(tasks)
      })
      .catch(next)
})

router.post('/', (req, res, next) => {
    const task = req.body
    tasks.add(task)
      .then(task => {
          res.status(201).json(task)
      })
      .catch(next)
})


router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: 'something went wrong inside the task router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router