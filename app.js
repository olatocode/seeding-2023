require("dotenv").config();
const express = require("express");
const db = require("./db/db");
const userRoutes = require("./routes/user.routes");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message:
    "Too many accounts created from this IP, please try again after an hour",
});

const app = express();

app.use(express.json({ extended: false }));
app.use(limiter);

app.get("/", (req, res) => res.send("API Running"));

app.use("/", userRoutes);

app.use((req, res, next) => {
  res.status(404).json({ msg: "404: Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "500: Internal Server Error" });
});

// listen on port 3000
const server = app.listen(3000, () =>
  console.log("Server started on port 3000")
);

// unhandled promise rejection handler
process.on("unhandledRejection", (err) => {
  console.log(`Logged Error: ${err}`);
  // close server & exit process
  server.close(() => process.exit(1));
});

// uncaught exception handler
process.on("uncaughtException", (err) => {
  console.log(`Logged Error: ${err}`);
  // close server & exit process
  server.close(() => process.exit(1));
});
