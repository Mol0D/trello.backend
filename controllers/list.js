const Board = require('../models/board');
const List = require('../models/list');

exports.createList = (req, res, next) => {
  const { boardId, title } = req;

  const list = new List({
      tasks: [],
      boardId,
      title
  });

  list
      .save()
      .then(() => {
          Board.findById(boardId)
      })
};
