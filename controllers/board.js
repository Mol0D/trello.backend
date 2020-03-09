const { validationResult } = require('express-validator/check');

const Board = require('../models/board');
const User = require('../models/user');

exports.addBoard = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);

        error.statusCode = 422;
        error.data = errors.array();

        throw error;
    }

    const { id, name } = req.body;

    const createdDate = new Date();

    const board = new Board({
        createdAt: createdDate,
        lastModified: createdDate,
        userId: id,
        lists: [],
        name,
    });

    board
        .save()
        .then(() => {
          return User.findById(id)
        })
        .then(user => {
            user.boards.push(board);
            return user.save()
        })
        .then(()=> {
            res.status(201).json({
                message: 'ok'
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        })
};

exports.getBoard = (req, res, next) => {
    const { boardId } = req.body;

    Board.findById(boardId)
        .then(board => {
            if (!board) {
                const error = new Error('Could not find board.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({board});
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        })
};

exports.addBoardList = (req, res, next) => {
    const { boardId, name } = req.body;

    let updateDate = new Date();

    Board.findOneAndUpdate({_id: boardId}, { $push: {lists: [{name}]}, lastModified: updateDate}, {new: true, useFindAndModify: false})
        .then(() => {
            res.status(201).json({
                message: 'ok'
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        })

};

exports.updateBoardList = (req, res, next) => {
  const { boardId, listId, newName } = req.body;

  const updateDate = new Date();

  Board.findOneAndUpdate([{_id: boardId}, {'lists._id': listId}], {
      $set: {
          'lists.$.name': newName
      },
      lastModified: updateDate
  }, {
      new: true,
      useFindAndModify: false
  })
      .then(() => {
      res.status(201).json({
          message: 'ok'
      })
  })
      .catch(err => {
          if (!err.statusCode) {
              err.statusCode = 500;
          }

          next(err);
      })

};

exports.deleteBoardList = (req, res, next) => {
    const {boardId, listId} = req.body;

    Board.findOneAndUpdate([{_id: boardId}, {'lists._id': listId}], {
        $pull: {
            lists: {_id: listId}
        }
    },
        {
            new: true,
            useFindAndModify: false
        }
    )
        .then(() => {
            res.status(201).json({
                message: 'ok'
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        })

};
