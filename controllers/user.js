const userService = require('../services/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAll = async (req, res) => {
    try {
        const result = await userService.getAll();

        if(!result || result.length < 1) {
            res.status(404).json('No users found');
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

    if (!req.body.email) {
        res.status(400).json('Field email is required');
    }

    if (!req.body.password) {
        res.status(400).json('Field password is required');
    }

    if (!req.body.board_id) {
        res.status(400).json('Field board_id is required');
    }

    if(!req.file) {
        res.status(400).json('Image file is required');
    }

    const password = bcrypt.hashSync(req.body.password, 10);

    const image = '/uploads/' + req.file.filename;

    const userBody = {
        name: req.body.name,
        image: image,
        email: req.body.email,
        password: password,
        admin: req.body.admin,
        active: req.body.active,
        board_id: req.body.board_id,
        team_id: req.body.team_id
    };

    try {
        const result = await userService.create(userBody);

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
};

const get = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await userService.get(id);

        if(!result || result.length < 1) {
            res.status(404).json('User not found');
        }

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
};

const update = async (req, res) => {
    const id = req.params.id;

    let userResult = {};

    try {
        userResult = await userService.get(id);
    } catch (err) {
        res.status(500).json(err.message);
    }

    if(!userResult || !userResult.length) {
        res.status(404).json('User not found');
    }


    let image = userResult.image;

    if(req.file) {
        image = '/uploads/' + req.file.filename;
    }

    const password = req.body.password ? bcrypt.hashSync(req.body.password, 10) : userResult.password;

    const user = {
        id: id,
        name: req.body.name ?? userResult.name,
        image: image,
        email: req.body.email ?? userResult.email,
        password: password,
        admin: req.body.admin ?? userResult.admin,
        active: req.body.active ?? userResult.active,
        board_id: req.body.board_id ?? userResult.board_id,
        team_id: req.body.team_id ?? userResult.team_id
    }

    try {
        const result = await userService.update(user);

        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await userService.get(id);

        if(!user || !user.length) {
            res.status(404).json('User not found');
        }

        const result = await userService.remove(id);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
}

const login = async (req, res) => {
    if (!req.body.email) {
        return res.status(400).json('Field email is required');
    }

    if (!req.body.password) {
        return res.status(400).json('Field password is required');
    }

    const field = {
        field: 'email',
        value: req.body.email
    }

    try {
        const result = await userService.getBy(field);

        if(!result || result.length < 1) {
            return res.status(401).json('Falha na autenticação');
        }

        const validPassword = bcrypt.compareSync(req.body.password, result.password)

        console.log("Ola: ",validPassword)

        if (validPassword) {
            const token = jwt.sign(
                {
                    id: result.id,
                    email: result.email,
                    admin: result.admin
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "1d"
                }
            );

            return res.status(200).json({
                message: 'Autenticado com sucesso',
                token: token
            });
        }

        return res.status(401).json('Falha na autenticação')
    } catch (err) {
        console.error(err);
        return res.status(500).json(err.message);
    }

}

module.exports = {getAll, create, update, remove, get, login};