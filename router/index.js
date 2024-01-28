const express = require("express");

const { upload } = require("../middleware/uploader");

const {
	getUsers,
	getUserById,
	createSignUp,
	createSignIn,
	deleteUser
} = require("../controller/user");
const {
	getWordLists,
	createWordList,
	deleteWordList
} = require("../controller/wordList");

const router = express.Router();

// Users
router.get("/get/users", getUsers);
router.get("/get/user/:id", getUserById);
router.post("/create/sign-up", upload.array("avatarlar"), createSignUp);
router.post("/create/sign-in", createSignIn);
router.delete("/delete/user/:id", deleteUser);

// WordLists
router.get("/get/word-lists", getWordLists);
router.post("/create/word-list", createWordList);
router.delete("/delete/word-list/:id", deleteWordList);

module.exports = router;
