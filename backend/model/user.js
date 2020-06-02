const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 8,
  },
  lastName: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (plainPassword, callBack) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) {
      return callBack(err);
    } else {
      callBack(null, isMatch);
    }
  });
};

userSchema.methods.generateToken = function (callBack) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), "secret");
  var oneHour = moment().add(1, "hour").valueOf();

  user.tokenExp = oneHour;
  user.token = token;
  user.save(function (err, userData) {
    if (err) {
      return callBack(err);
    } else {
      callBack(null, userData);
    }
  });
};

userSchema.statics.findByToken = function (token, callBack) {
  var user = this;

  jwt.verify(token, "secret", function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, userData) {
      if (err) {
        return callBack(err);
      } else {
        callBack(null, userData);
      }
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
