const express = require("express");
const app = express();
const members = require("./Members");
const logger = require("./logger");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Use ejs view engine
app.set("view engine", "ejs");

// Body parser
app.use(express.urlencoded({ extended: false }));

// Set the config file
dotenv.config({ path: "./config/config.env" });

// Mongoose Connection
mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//midleware
app.use(logger);

// Routes Middleware
app.use("/", require("./routes/index"));
app.use("/api", require("./routes/api"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/api/members", (req, res) => {
  res.json(members);
});

app.post("/shortUrls", (req, res) => {});

const port = process.env.PORT || 5000; // Remove rhis port and require it from the .env file

app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
