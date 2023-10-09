const pointService = require('../services/point');

const getAll = async (req, res) => {
    try {
        const result = await pointService.getAll();

        if(!result || result.length < 1) {
            return res.status(404).json('No points found');
        }
        
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(err.message);
    }
};

const create = async (req, res) => {
    if (!req.body.description) {
        return res.status(400).json('Field description is required');
    }

    if (!req.body.done_in) {
        return res.status(400).json('Field done_in is required');
    }

    if (!req.body.task_id) {
        return res.status(400).json('Field task_id is required');
    }

    const point = {
        description: req.body.description,
        done_in: req.body.done_in,
        task_id: req.body.task_id,
        user_id: req.user.id
    };

    try {
        const result = await pointService.create(point);

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
};

const get = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pointService.get(id);

        if(!result || result.length < 1) {
            return res.status(404).json('Point not found');
        }

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
};

const update = async (req, res) => {
    if(!req.user.admin) {
        return res.status(401).json('Unauthorized');
    }

    const id = req.params.id;

    if (!req.body.cancelled) {
        return res.status(400).json('Field done_in is required');
    }

    if (!req.body.approved) {
        return res.status(400).json('Field task_id is required');
    }

    const point = {
        cancelled: req.body.cancelled ?? false,
        approved: req.body.approved ?? false
    };

    try {
        const pointResult = await pointService.get(id);

        if(!pointResult || pointResult.length < 1) {
            return res.status(404).json('Point not found');
        }

        const result = await pointService.update(point);

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    if(!req.user.admin) {
        return res.status(401).json('Unauthorized');
    }

    try {
        const point = await pointService.get(id);

        if(!point || point.length < 1) {
            return res.status(404).json('Point not found');
        }

        const result = await pointService.remove(id);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
};

module.exports = {getAll, create, update, remove, get};