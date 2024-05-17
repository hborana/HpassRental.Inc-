const express = require("express");
const { chats } = require("./Test/data");

const app = express();

app.get("/", (req, res) => {
  res.send("API is Running !! ");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.listen(3000, console.log("Server is ON !!"));
