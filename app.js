const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contactsRouter");
const authRouter = require("./routes/api/authRouter");
const fileRouter = require("./routes/api/fileRouter")
const { errorHandler } = require("./helpers/apiHelpers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());



app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use("/api/avatars", fileRouter)


app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
