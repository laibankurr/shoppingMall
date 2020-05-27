const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const dbURI = require("./dbSelect");
const bodyParser = require("body-parser");
const { User } = require("./model/user");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(dbURI.mongoDB_URI, {
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

  user.save((err, userData) => {
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
