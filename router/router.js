const router = require('express').Router();

const boardController = require('../controllers/board');
const teamController = require('../controllers/team');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: storage
});

// Boards routes
router.route('/boards')
        .get(boardController.getAll)
        .post(boardController.create);
router.route('/boards/:id')
        .get(boardController.get)
        .put(boardController.update)
        .delete(boardController.remove);

// Teams routes
router.route('/teams')
        .get(teamController.getAll)
        .post(upload.single('image'), teamController.create);
router.route('/teams/:id')
        .get(teamController.get)
        .put(upload.single('image'), teamController.update)
        .delete(teamController.remove);

module.exports = router;