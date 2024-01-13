const Users = require("../models/users");

const checkRole = (roles) => async (req, res, next) => {
    let id = req.user.id
    const user = await Users.findOne({ _id: id });
    !roles.includes(user.userType)? res.status(401).json("Sorry you do not have access to this route"): next();
};

module.exports = checkRole;