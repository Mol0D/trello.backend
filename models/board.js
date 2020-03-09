const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      required: true,
    },
    lastModified:  {
      type: Date,
      required: true,
    },
    userId: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    },
    lists: [
        {
            name: {
                type: String,
                required: true,
            },
            cards: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    description: {
                        type: String,
                        default: '',
                    },
                    createdAt: {
                        type: Date,
                        required: true
                    },
                    userId: {
                        type: Schema.Types.ObjectID,
                        ref: 'User'
                    }
                }
            ]
        }
    ]
},{
    versionKey: false
});

module.exports = mongoose.model('Board', boardSchema);

