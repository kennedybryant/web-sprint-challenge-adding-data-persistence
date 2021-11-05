// build your `Task` model here
const db = require('../../data/dbConfig')

async function getAll() {
    const result = await db('tasks')
    const tasks = result.map((task) => {
        return {
            task_id: task.task_id,
            task_description: task.task_description,
            task_notes: task.task_notes,
            task_completed: Boolean(task.task_completed)
        }
    })
    return tasks
}

function add(task) {
    return db('tasks').insert(task)
        .then(([task_id]) => {
            return db('tasks').where('task_id', task_id).first()
        .then((task) => {
            return {
                task_id: task.task_id,
                task_description: task.task_description,
                task_notes: task.task_notes,
                task_completed: Boolean(task.task_completed),
                project_id: task.project_id
            }
        })
    })
}

module.exports = {
    getAll,
    add
}