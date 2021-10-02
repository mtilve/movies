const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
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
    email: {		
		type: String,
		required: true,
		trim: true,
		unique: true
	},
    password: {
		type: String,
		required: true,
		trim: true,
	},
	created: {
		type: Date,
		default: Date.now()
	}

});

module.exports = mongoose.model('User', UserSchema);