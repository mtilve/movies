const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: {
		type: String,
		required: true,
		trim: false
	},
    poster: {
		type: String,
		required: false,
		trim: false
	},
    date: {
		type: String,
		required: false,
		trim: false
	},
    calification: {
        type     : Number,
        required : false,
        unique   : false,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
	},
    actors:[{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor' }]

});

module.exports = mongoose.model('Movie', MovieSchema);