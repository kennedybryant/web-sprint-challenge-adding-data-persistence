// build your `Project` model here
const db = require('../../data/dbConfig')

async function getAll() {
    const result = await db('projects')
    const projects = result.map((project) => {
        return {
            project_id: project.project_id,
            project_name: project.project_name,
            project_description: project.project_description,
            project_completed: Boolean(project.project_completed)
        }
    })
    return projects
}

function add(project) {
    return db('projects').insert(project)
        .then(([project_id]) => {
            return db('projects').where('project_id', project_id).first()
        .then((project) =>{
            return {
                project_id: project.project_id,
                project_name: project.project_name,
                project_description: project.project_description,
                project_completed: Boolean(project.project_completed)
            }
        })
    })
}

module.exports = {
    getAll,
    add
}