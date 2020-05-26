const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const dbIdPw = require("./mongoDB_Info");
const mongoDB_URI = `mongodb+srv://${dbIdPw.id}:${dbIdPw.pw}@cluster0-6htbs.mongodb.net/test?retryWrites=true&w=majority`;

mongoose
  .connect(mongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Succeed to get from Home"));
app.listen(port, () => console.log(`Server is running on port ${port}`));
