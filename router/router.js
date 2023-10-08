const router = require('express').Router();

const boardController = require('../controllers/board');

router.route('/boards')
        .get(boardController.getAll)
        .post(boardController.create);

router.route('/boards/:id')
        .get(boardController.get)
        .put(boardController.update)
        .delete(boardController.remove);

        

module.exports = router;