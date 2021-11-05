// build your `Task` model here
const db = require('../../data/dbConfig')

function getAll() {
    const tasks = db('tasks')
    return tasks
}

function add(task) {
    return db('tasks').insert(task)
        .then(([task_id]) => {
            return db('tasks').where('task_id', task_id).first()
    })
}

module.exports = {
    getAll,
    add
}