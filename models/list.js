const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    tasks: {
        type: Array,
        default: []
    },
    boardId: {
        type: mongoose.Types.ObjectId,
        ref: 'Board'
    }
});

module.exports = mongoose.model('List', listSchema);
