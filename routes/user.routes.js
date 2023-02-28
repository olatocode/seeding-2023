const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(200).json({ msg: "User registered" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ errors: [{ msg: "User does not exist" }] });
    }
    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    return res.status(200).json({ msg: "User logged in" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
