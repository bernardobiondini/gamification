const router = require('express').Router();

const boardController = require('../controllers/board');
const teamController = require('../controllers/team');
const userController = require('../controllers/user');
const taskController = require('../controllers/task');

const login = require('../middlewares/login');
const upload = require('../middlewares/upload');

router.route('/boards')
        .get(login, boardController.getAll)
        .post(login, boardController.create);
router.route('/boards/:id')
        .get(login, boardController.get)
        .put(login, boardController.update)
        .delete(login, boardController.remove);

// Tasks routes
router.route('/tasks')
        .get(login, taskController.getAll)
        .post(login, taskController.create);
router.route('/tasks/:id', login)
        .get(login, taskController.get)
        .put(login, taskController.update)
        .delete(login, taskController.remove);

// Boards routes
router.route('/boards')
        .get(login, boardController.getAll)
        .post(login, boardController.create);
router.route('/boards/:id', login)
        .get(login, boardController.get)
        .put(login, boardController.update)
        .delete(login, boardController.remove);

// Teams routes
router.route('/teams')
        .get(login, teamController.getAll)
        .post(login, upload.single('image'), teamController.create);
router.route('/teams/:id', login)
        .get(login, teamController.get)
        .put(login, upload.single('image'), teamController.update)
        .delete(login, teamController.remove);

// Users routes
router.route('/users')
        .get(login, userController.getAll)
        .post(upload.single('image'), userController.create);
router.route('/users/:id')
        .get(login, userController.get)
        .put(login, upload.single('image'), userController.update)
        .delete(login, userController.remove);
router.post('/login', userController.login);

module.exports = router;