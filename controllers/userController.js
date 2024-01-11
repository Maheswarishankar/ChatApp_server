
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const genarateToken = require("../config/generateToken");


// Signup ...............................................................
//decription----Register New user...........
//route------POST/api/user.............
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password} = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ message: "Please Enter all fields" })
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: "User already exists" })
    }

    const user = await User.create({
        username, email, password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            picture: user.picture,
            token :genarateToken(user._id)

        });

    } else {
        res.status(400).json({ message: "User not found" })
    }
}
)

//Login.........................................................
//decription----Auth the user...........
//route------GET/user/login.............

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: genarateToken(user._id),
      });
    } else {
        res.status(400).json({ message: "Invalid Email or Password" })
    }
  });

  //Get or search all users.......................................................
  //decription----Get or search all users...........
  //route------GET /api/user?search=...........

  const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  });

module.exports = { registerUser,authUser,allUsers }
