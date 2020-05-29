const dbIdPw = require("./mongoDB_Info");

if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoDB_URI: process.env.MONGO_URI,
  };
} else {
  module.exports = {
    mongoDB_URI: `mongodb+srv://${dbIdPw.id}:${dbIdPw.pw}@cluster0-6htbs.mongodb.net/test?retryWrites=true&w=majority`,
  };
}
