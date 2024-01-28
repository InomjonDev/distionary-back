const { WordLists, validateWordList } = require("../models/wordListSchema");

exports.getWordLists = async (req, res) => {
	try {
		const wordLists = await WordLists.find().sort({ _id: -1 });

		res
			.status(200)
			.json({ variant: "success", msg: "All word list", innerData: wordLists });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ variant: "error", msg: "Server error", innerData: null });
	}
};

exports.createWordList = async (req, res) => {
	try {
		const { error } = validateWordList();

		if (error) {
			return res.status(400).json({
				variant: "warning",
				msg: error.details[0].message,
				innerData: null
			});
		}

		const newWordList = await WordLists.create(req.body);
		res.status(201).json({
			variant: "success",
			msg: "Word list is created",
			innerData: newWordList
		});
	} catch (eror) {
		console.log(error);
		res
			.status(500)
			.json({ variant: "error", msg: "Server error", innerData: null });
	}
};

exports.deleteWordList = async (req, res) => {
	try {
		const { id } = req.params;

		const deletedWordList = await WordLists.findByIdAndDelete(id);

		res.status(201).json({
			variant: "success",
			msg: "Word list is deleted",
			innerData: deletedWordList
		});
	} catch {
		res
			.status(500)
			.json({ variant: "error", msg: "Server error", innerData: null });
	}
};
