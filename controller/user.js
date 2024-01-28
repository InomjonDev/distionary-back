const { Users, validateUser } = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const cloudinary = require("../cloudinary");
const fs = require("fs");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.getUsers = async (req, res) => {
	try {
		const users = await Users.find();
		res
			.status(200)
			.json({ variant: "success", msg: "All users", innerData: users });
	} catch (error) {
		res
			.status(500)
			.json({ variant: "error", msg: "Server error", innerData: null });
	}
};

exports.createSignUp = async (req, res) => {
	try {
		const uploader = async path => await cloudinary.uploads(path, "photos");
		let image = [];

		if (req.files) {
			const files = req.files;

			for (const file of files) {
				const { path } = file;
				const newPath = await uploader(path);
				image.push(newPath);
				fs.unlinkSync(path);
			}
		}

		const { username, email, password, name } = req.body;

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const { error } = validateUser(req.body);
		if (error) {
			return res.status(400).json({
				variant: "warning",
				msg: error.details[0].message,
				innerData: null
			});
		}

		const existsUser = await Users.findOne({ username });

		if (existsUser) {
			return res.status(400).json({
				variant: "warning",
				msg: "Username is invalid",
				innerData: null
			});
		}

		const token = jwt.sign({ username, email }, process.env.privateKey);

		const newUser = await Users.create({
			username,
			email,
			password: hashedPassword,
			name,
			image
		});

		res.status(201).json({
			variant: "success",
			msg: "User is created",
			innerData: {
				user: newUser,
				token
			}
		});
	} catch (error) {
		res
			.status(500)
			.json({ variant: "error", msg: "Server error", innerData: null });
	}
};

exports.createSignIn = async (req, res) => {
	try {
		const { username, password } = req.body;
		const existsUser = await Users.findOne({ username });
		if (!existsUser) {
			return res.status(404).json({
				variant: "warning",
				msg: "username is not found",
				innerData: null
			});
		}

		bcrypt.compare(password, existsUser.password, function (err, results) {
			if (results) {
				const token = jwt.sign(
					{
						username: existsUser.username,
						password: existsUser.password
					},
					process.env.privateKey
				);

				existsUser.password = null;

				res.status(200).json({
					variant: "success",
					msg: "welcome",
					innerData: { user: existsUser, token }
				});
			} else {
				res.status(400).json({
					variant: "warning",
					msg: "password is incorrect",
					innerData: null
				});
			}
		});
	} catch {
		res
			.status(500)
			.json({ variant: "error", msg: "Server error", innerData: null });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const deletedUser = await Users.findByIdAndDelete(req.params.id);
		if (!deletedUser) {
			return res
				.status(404)
				.json({ variant: "error", msg: "User not found", innerData: null });
		}
		res.status(200).json({
			variant: "success",
			msg: "user is deleted",
			innerData: deletedUser
		});
	} catch (error) {
		res
			.status(500)
			.json({ variant: "error", msg: "Server error", innerData: null });
	}
};

exports.updateUser = async (req, res) => {
	try {
		const { error } = validateUser(req.body);
		if (error) {
			return res.status(400).json({
				variant: "warning",
				msg: error.details[0].message,
				innerData: null
			});
		}
		let { id } = req.params;
		let updatedUser = await Blogs.findByIdAndUpdate(id, req.body, {
			new: true
		});
		res.status(200).json({
			variant: "success",
			msg: "user is updated",
			innerData: updatedUser
		});
	} catch {
		res
			.status(500)
			.json({ variant: "error", msg: "Server error", innerData: null });
	}
};

exports.getUserById = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await Users.findById(id);

		if (!user) {
			return res
				.status(404)
				.json({ variant: "error", msg: "Not found", innerData: null });
		}

		res.status(200).json({ variant: "success", msg: "User", innerData: user });
	} catch {
		res
			.status(500)
			.json({ variant: "error", msg: "Server error", innerData: null });
	}
};
