// build your `Task` model here
const db = require('../../data/dbConfig')

async function getAll() {
//     SELECT 
//     t.*,
//     p.project_name,
//     p.project_description
// FROM tasks as t
// LEFT JOIN projects as p
//     ON t.project_id = p.project_id
// GROUP BY t.project_id
// ORDER BY t.project_id ASC;

const rows = await db('tasks as t')
    .leftJoin('projects as p', 'p.project_id', 't.project_id')
    .select('t.task_id', 
        't.task_description', 
        't.task_notes', 
        't.task_completed',
        'p.project_name', 
        'p.project_description')

    const tasks = rows.map((task) => {
        return {
            task_id: task.task_id,
            task_description: task.task_description,
            task_notes: task.task_notes,
            task_completed: Boolean(task.task_completed),
            project_name: task.project_name,
            project_description: task.project_description
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