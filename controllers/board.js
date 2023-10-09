const boardService = require('../services/board');

const getAll = async (req, res) => {
    try {
        const result = await boardService.getAll();

        if(!result || result.length < 1) {
            res.status(404).json('No boards found');
        }
        
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

const create = async (req, res) => {
    if (!req.body.name) {
        res.status(400).json('Field name is required');
    }

    try {
        const result = await boardService.create(req.body);

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
};

const get = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await boardService.get(id);

        if(!result || result.length < 1) {
            res.status(404).json('Board not found');
        }

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
};

const update = async (req, res) => {
    const id = req.params.id;

    if (!req.body.name) {
        res.status(400).json('Field name is required');
    }

    const board = {
        id: id,
        name: req.body.name
    }

    try {
        const boardResult = await boardService.get(id);

        if(!boardResult || !boardResult.length) {
            res.status(404).json('Board not found');
        }

        const result = await boardService.update(board);

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        const board = await boardService.get(id);

        if(!board || !board.length) {
            res.status(404).json('Board not found');
        }

        const result = await boardService.remove(id);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
}

module.exports = {getAll, create, update, remove, get};