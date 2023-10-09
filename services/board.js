const database = require('../database/config');

const getAll = async () => {
    try {
        const result = await database('boards').select('*');

        return result;
    } catch (err) {
        throw err;
    }
}

const create = async (boardBody) => {
    try {
        const result = await database('boards').insert(boardBody);

        return result;
    } catch (err) {
        throw err;
    }
}

const update = async (boardBody) => {
    try {
        const result = await database('boards').where('id', boardBody.id).first().update(boardBody);

        return result;
    } catch (err) {
        throw err;
    }
}

const remove = async (id) => {
    try {
        const result = await database('boards').where('id', id).first().del();

        return result;
    } catch (err) {
        throw err;
    }
}

const get = async (id) => {
    try {
        const result = await database('boards').where('id', id);

        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = {getAll, create, update, remove, get};