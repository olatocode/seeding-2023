const express = require('express');
const router = express.Router();
const User = require('../model/user.model'); 
const bcrypt = require('bcrypt');  

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/signup', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        // check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' },
        ] });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create new user
        const user = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        // save user to database
        await user.save();

        return res.status(200).json({ msg: 'User registered' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');

    }
});

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // check if user exists
        
        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(400).json({ errors: [{ msg: 'User does not exist' }] });
        }
        // write a login route to guess user password and brute force attack
        const isMatch = await bcrypt.compare(password, existUser.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }

        return res.status(200).json({ msg: 'User logged in' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });

    }
});



module.exports = router;