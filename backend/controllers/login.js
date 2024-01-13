const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const register = async(req, res) => {
    const {
        name,
        username,
        password,
        userType
    } = req.body;
    console.log(req.body);

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        username,
        password: passwordHash,
        userType
    });
    console.log(newUser);
    const savedUser = await User.create(newUser);
    res.status(201).json({ savedUser });
};

const login = async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    console.log(user);
    if(!user) {
        return res.status(400).json({ msg: "User does not exist!!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password!!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    delete user.password;
    res.status(200).json({ token, user });
};

const logout = async(req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
    register,
    login,
    logout
};