const mongoose = require("mongoose");

const connect = (uri) => {
  mongoose.set("strictQuery", false);
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = connect;
