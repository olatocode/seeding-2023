const mongoose = require("mongoose");

// create a replica set connection
mongoose.connect("mongodb://127.0.0.1/brute-force", { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, `connection error: `));
db.once("open", () => {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});



module.exports = db;
