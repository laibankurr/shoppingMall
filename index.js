const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const dbIdPw = require("./mongoDB_Info");
const mongoDB_URI = `mongodb+srv://${dbIdPw.id}:${dbIdPw.pw}@cluster0-6htbs.mongodb.net/test?retryWrites=true&w=majority`;
const bodyParser = require("body-parser");
const { User } = require("./model/user");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, res) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.status(200).json({
        success: true,
      });
    }
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
