const database = require('../database/config');

const getAll = async () => {
    try {
        const result = await database('tasks').select('*');

        return result;
    } catch (err) {
        throw err;
    }
};

const create = async (taskBody) => {
    try {
        const result = await database('tasks').insert(taskBody);

        return result;
    } catch (err) {
        throw err;
    }
};

const update = async (taskBody) => {
    try {
        const result = await database('tasks').where('id', taskBody.id).first().update(taskBody);

        return result;
    } catch (err) {
        throw err;
    }
};

const remove = async (id) => {
    try {
        const result = await database('tasks').where('id', id).first().del();

        return result;
    } catch (err) {
        throw err;
    }
};

const get = async (id) => {
    try {
        const result = await database('tasks').where('id', id);

        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = {getAll, create, update, remove, get};