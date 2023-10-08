const teamService = require('../services/team');

const getAll = async (req, res) => {
    try {
        const result = await teamService.getAll();

        if(!result || !result.length) {
            res.status(404).json('No teams found');
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

    if(!req.file) {
        res.status(400).json('Image file is required');
    }

    const teamBody = {
        name: req.body.name,
        image: '/uploads/' + req.file.originalname
    };

    try {
        const result = await teamService.create(teamBody);

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
};

const get = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await teamService.get(id);

        if(!result || !result.length) {
            res.status(404).json('Team not found');
        }

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
};

const update = async (req, res) => {
    const id = req.params.id;

    let teamResult = {};

    try {
        teamResult = await teamService.get(id);
    } catch (err) {
        res.status(500).json(err.message);
    }

    if (!req.body.name) {
        res.status(400).json('Field name is required');
    }

    if(!teamResult || !teamResult.length) {
        res.status(404).json('Team not found');
    }


    let image = teamResult.image;

    if(req.file) {
        image = '/uploads/' + req.file.originalname;
    }

    const team = {
        id: id,
        name: req.body.name,
        image: image
    }

    try {
        const result = await teamService.update(team);

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        const team = await teamService.get(id);

        if(!team || !team.length) {
            res.status(404).json('Team not found');
        }

        const result = await teamService.remove(id);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
}

module.exports = {getAll, create, update, remove, get};