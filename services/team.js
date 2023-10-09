const database = require('../database/config');

const getAll = async () => {
    try {
        const result = await database('teams').select('*');

        return result;
    } catch (err) {
        throw err;
    }
};

const create = async (teamBody) => {
    try {
        const result = await database('teams').insert(teamBody);

        return result;
    } catch (err) {
        throw err;
    }
};

const update = async (teamBody) => {
    try {
        const result = await database('teams').where('id', teamBody.id).first().update(teamBody);

        return result;
    } catch (err) {
        throw err;
    }
};

const remove = async (id) => {
    try {
        const result = await database('teams').where('id', id).first().del();

        return result;
    } catch (err) {
        throw err;
    }
};

const get = async (id) => {
    try {
        const result = await database('teams').where('id', id);

        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = {getAll, create, update, remove, get};