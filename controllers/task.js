const taskService = require('../services/task');

const getAll = async (req, res) => {
    try {
        const result = await taskService.getAll();

        if(!result || result.length < 1) {
            return res.status(404).json('No tasks found');
        }
        
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(err.message);
    }
};

const create = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json('Field name is required');
    }

    if (!req.body.description) {
        return res.status(400).json('Field description is required');
    }

    if (!req.body.points) {
        return res.status(400).json('Field points is required');
    }

    const task = {
        name: req.body.name,
        description: req.body.description,
        points: req.body.points
    };

    try {
        const result = await taskService.create(task);

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
};

const get = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await taskService.get(id);

        if(!result || result.length < 1) {
            return res.status(404).json('Task not found');
        }

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
};

const update = async (req, res) => {
    const id = req.params.id;

    if (!req.body.name) {
        return res.status(400).json('Field name is required');
    }

    if (!req.body.description) {
        return res.status(400).json('Field description is required');
    }

    if (!req.body.points) {
        return res.status(400).json('Field points is required');
    }


    const task = {
        id: id,
        name: req.body.name,
        description: req.body.description,
        points: req.body.points
    };

    try {
        const taskResult = await taskService.get(id);

        if(!taskResult || taskResult.length < 1) {
            return res.status(404).json('Task not found');
        }

        const result = await taskService.update(task);

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        const task = await taskService.get(id);

        if(!task || task.length < 1) {
            return res.status(404).json('Task not found');
        }

        const result = await taskService.remove(id);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
};

module.exports = {getAll, create, update, remove, get};