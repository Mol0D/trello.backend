const express = require('express');
const { body } = require('express-validator/check');

const boardController = require('../controllers/board');

const router = express.Router();

router.post(
    '/add',
    [
        body('name')
            .isLength({min: 1})
            .withMessage('Please enter a name with only numbers and text at least 1 character')
    ],
    boardController.addBoard
);

router.get('/get', boardController.getBoard);

router.post('/list/create', boardController.addBoardList);

router.post('/list/update', boardController.updateBoardList);

router.post('/list/delete', boardController.deleteBoardList);

router.post('/list/card/add', boardController.addBoardListCard);

router.post('/list/card/update', boardController.updateBoardListCard);

module.exports = router;
