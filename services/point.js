const database = require('../database/config');

const getAll = async () => {
    try {
        const result = await database('points')
            .select('points.*', 'tasks.name', 'tasks.points', 'users.name', 'teams.name')
            .join('users', 'users.id', 'points.user_id')
            .join('teams', 'teams.id', 'users.team_id')
            .join('tasks', 'tasks.id', 'points.task_id');

        return result;
    } catch (err) {
        throw err;
    }
};

const create = async (pointBody) => {
    try {
        const result = await database('points').insert(pointBody);

        return result;
    } catch (err) {
        throw err;
    }
};

const update = async (pointBody) => {
    try {
        const result = await database('points').where('id', pointBody.id).first().update(pointBody);

        return result;
    } catch (err) {
        throw err;
    }
};

const remove = async (id) => {
    try {
        const result = await database('points').where('id', id).first().del();

        return result;
    } catch (err) {
        throw err;
    }
};

const get = async (id) => {
    try {
        const result = await database('points').where('id', id);

        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = {getAll, create, update, remove, get};