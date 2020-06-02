const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const dbURI = require("./dbSelect");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleWare/auth");
const { User } = require("./model/user");
const { Item } = require("./model/item");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

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
  });
});

app.post("/api/register", (req, res) => {
  User.findOne({ email: req.body.email }, (err, matchedData) => {
    if (matchedData) {
      return res.json({
        registerSuccess: false,
      });
    } else {
      const user = new User(req.body);

      user.save((err, userData) => {
        if (err) {
          return res.json({ success: false, err });
        } else {
          return res.status(200).json({
            registerSuccess: true,
          });
        }
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, matchedData) => {
    if (!matchedData) {
      return res.json({
        loginSuccess: false,
        message: "Wrong email",
      });
    } else {
      matchedData.checkPassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "Wrong password",
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

app.post("/api/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

app.post("/api/item", (req, res) => {
  const item = new Item(req.body);

  item.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/api/items", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 12;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  let findArgs = {};

  for (let key in req.body.options) {
    if (req.body.options[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.options[key][0],
          $lte: req.body.options[key][1],
        };
      } else {
        findArgs[key] = req.body.options[key];
      }
    }
  }

  if (term) {
    Item.find(findArgs)
      .find({ title: { $regex: term } })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, itemInfo) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        } else {
          res.status(200).json({
            success: true,
            itemInfo,
            itemQuantity: itemInfo.length,
          });
        }
      });
  } else {
    Item.find(findArgs)
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, itemInfo) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        } else {
          res.status(200).json({
            success: true,
            itemInfo,
            itemQuantity: itemInfo.length,
          });
        }
      });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
