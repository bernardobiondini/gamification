const database = require('../database/config');

const getAll = async () => {
    try {
        const result = await database('users')
            .select('users.name', 'users.email', 'users.image', 'boards.name as board_name', 'boards.id as board_id', 'teams.id as team_id', 'teams.name as team_name')
            .join('boards', 'users.board_id', 'boards.id')
            .join('teams', 'users.team_id', 'teams.id')
            .where('users.active', 1);

        return result;
    } catch (err) {
        throw err;
    }
};

const create = async (userBody) => {
    try {
        const result = await database('users').insert(userBody);

        return result;
    } catch (err) {
        throw err;
    }
};

const update = async (userBody) => {
    try {
        const result = await database('users').where('id', userBody.id).first().update(userBody);

        return result;
    } catch (err) {
        throw err;
    }
};

const remove = async (id) => {
    try {
        const result = await database('users').where('id', id).first().del();

        return result;
    } catch (err) {
        throw err;
    }
};

const get = async (id) => {
    try {
        const result = await database('users').where('id', id);

        return result;
    } catch (err) {
        throw err;
    }
};

const getBy = async (field) => {
    try {
        const result = await database('users').where(field.field, field.value).first();

        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = {getAll, create, update, remove, get, getBy};