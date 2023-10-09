const teamService = require('../services/team');

const getAll = async (req, res) => {
    try {
        const result = await teamService.getAll();

        if(!result || result.length < 1) {
            return res.status(404).json('No teams found');
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

    if(!req.file) {
        return res.status(400).json('Image file is required');
    }

    const teamBody = {
        name: req.body.name,
        image: '/uploads/' + req.file.filename
    };

    try {
        const result = await teamService.create(teamBody);

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
};

const get = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await teamService.get(id);

        if(!result || result.length < 1) {
            return res.status(404).json('Team not found');
        }

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
};

const update = async (req, res) => {
    const id = req.params.id;

    let teamResult = {};

    try {
        teamResult = await teamService.get(id);
    } catch (err) {
        return res.status(500).json(err.message);
    }

    if(!teamResult || !teamResult.length) {
        return res.status(404).json('Team not found');
    }

    if (!req.body.name) {
        return res.status(400).json('Field name is required');
    }

    let image = teamResult.image;

    if(req.file) {
        image = '/uploads/' + req.file.filename;
    }

    const team = {
        id: id,
        name: req.body.name,
        image: image
    };

    try {
        const result = await teamService.update(team);

        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        const team = await teamService.get(id);

        if(!team || !team.length) {
            return res.status(404).json('Team not found');
        }

        const result = await teamService.remove(id);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }
};

module.exports = {getAll, create, update, remove, get};