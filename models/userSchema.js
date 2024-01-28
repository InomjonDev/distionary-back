const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	image: {
		type: Array,
		required: false
	},
	username: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

const Users = model("user", userSchema);

const validateUser = body => {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().required(),
		username: Joi.string().required(),
		password: Joi.string().required(),
		createAt: Joi.date(),
		image: Joi.array()
	});
	return schema.validate(body);
};

module.exports = { Users, validateUser };
