"use strict";

const express = require("express");
const path = require("path");
const app = express();
const config = require("./config");

app.use("/", express.static("src/client"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(config.PORT, () => {
  console.log(`Server is listening on port ${config.PORT}`);
});
