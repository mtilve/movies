const mongoose = require('mongoose');

const ActorSchema = mongoose.Schema({
    name: {
		type: String,
		required: true,
		trim: false
	},
    lastname: {
		type: String,
		required: true,
		trim: false
	},
    age: {
		type: Number,
		required: true,
		trim: false
	},
    picture: {		
		type: String,
		required: false,
		trim: false,
		unique: false
	},
    weight: {
		type: Number,
		required: false
	},
	created: {
		type: Date,
		default: Date.now()
	}

});

module.exports = mongoose.model('Actor', ActorSchema);