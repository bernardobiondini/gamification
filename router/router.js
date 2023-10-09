const router = require('express').Router();

const boardController = require('../controllers/board');
const teamController = require('../controllers/team');
const userController = require('../controllers/user');
const taskController = require('../controllers/task');

router.route('/boards')
        .get(boardController.getAll)
        .post(boardController.create);

router.route('/boards/:id')
        .get(boardController.get)
        .put(boardController.update)
        .delete(boardController.remove);

        

// Tasks routes
router.route('/tasks')
        .get(login, taskController.getAll)
        .post(login, taskController.create);
router.route('/tasks/:id', login)
        .get(login, taskController.get)
        .put(login, taskController.update)
        .delete(login, taskController.remove);

module.exports = router;