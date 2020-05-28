const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const dbURI = require("./dbSelect");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleWare/auth");
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

app.get("/api/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    firstname: req.user.firstName,
    lastname: req.user.lastName,
    role: req.user.role,
    image: req.user.image,
    //cart: req.user.cart,
    //history: req.user.history,
  });
});

app.post("/api/register", (req, res) => {
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

app.post("/api/login", (req, res) => {
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

app.get("/api/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, userData) => {
      if (err) {
        return res.json({ success: false, err });
      } else {
        return res.status(200).send({
          success: true,
        });
      }
    }
  );
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
