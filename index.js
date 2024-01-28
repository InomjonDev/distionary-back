const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
	.connect(process.env.DATABASE_URL)
	.then(() => console.log("DATABASE is connected"))
	.catch(() => console.log("DATABASE is not connected"));

app.get("/", async (req, res) => {
	res.send("App is running!");
});

app.use("/", require("./router"));

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`App is running on port: ${PORT}`);
});
