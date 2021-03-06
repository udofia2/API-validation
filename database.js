const mongoose = require("mongoose");

const dbConnection = () => {
  const db = mongoose.connection;

  mongoose.connect(process.env.DB_USER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set("useCreateIndex", true);
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => console.log("Connection to flutterwave Database established....."));
};

module.exports = dbConnection;