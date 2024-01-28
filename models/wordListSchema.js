const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { ObjectId } = Schema.Types;

const wordListSchema = new Schema({
	english: {
		type: String,
		reduired: true
	},
	russian: {
		type: String,
		required: true
	},
	wordType: {
		type: String,
		required: true
	},
	author: {
		type: ObjectId,
		ref: "User",
		required: true
	},
	unit: {
		type: "String",
		required: true
	}
	// hello world my name is Inomjon
});

const WordLists = model("wordList", wordListSchema);

const validateWordList = body => {
	const schema = Joi.object({
		english: Joi.string().required(),
		russian: Joi.string().required(),
		author: Joi.string().required(),
		wordType: Joi.string().required(),
		unit: Joi.string().required()
	});
	return schema.validate(body);
};

module.exports = { WordLists, validateWordList };
// const { Schema, model } = require("mongoose");
// const Joi = require("joi");
// const { ObjectId } = Schema.Types;

// const unitSchema = new Schema({
// 	english: {
// 		type: String,
// 		required: true
// 	},
// 	russian: {
// 		type: String,
// 		required: true
// 	},
// 	author: {
// 		type: ObjectId,
// 		ref: "User",
// 		required: true
// 	}
// });

// const wordListSchema = new Schema({
// 	units: {
// 		type: [unitSchema],
// 		required: true
// 	}
// });

// const WordLists = model("wordList", wordListSchema);

// const validateWordList = body => {
// 	const schema = Joi.object({
// 		units: Joi.array()
// 			.items(
// 				Joi.object({
// 					english: Joi.string().required(),
// 					russian: Joi.string().required(),
// 					author: Joi.string().required()
// 				})
// 			)
// 			.required()
// 	});
// 	return schema.validate(body);
// };

// module.exports = { WordLists, validateWordList };
