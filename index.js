const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const dbURI = require("./dbSelect");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./model/user");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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

app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, matchedData) => {
    if (!matchedData) {
      return res.json({
        loginSuccess: false,
        message: "Unable to find registered email.",
      });
    } else {
      matchedData.checkPassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "Wrong password. Please check again.",
          });
        } else {
          matchedData.generateToken((err, userData) => {
            if (err) {
              return res.status(400).send(err);
            } else {
              res.cookie("authCookieExp", userData.tokenExp);
              res.cookie("authCookie", userData.token).status(200).json({
                loginSuccess: true,
                userId: userData._id,
              });
            }
          });
        }
      });
    }
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
