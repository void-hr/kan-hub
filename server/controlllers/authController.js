const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const registerAccount = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Bad request", status: "ERROR" });
    }
    const isExistingUser = await User.findOne({ email: email });
    if (isExistingUser) {
      return res
        .status(409)
        .json({ message: "User already exists", status: "ERROR" });
    }
    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hash,
    });
    const jwtToken = await jwt.sign(
      { userId: newUser._id },
      process.env.TOKEN_SECRET
    );
    return res.json({
      message: "User created successfully",
      token: jwtToken,
      name: newUser?.name,
      status: "SUCCESS",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: "ERROR" });
  }
};

const loginAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Bad request", status: "ERROR" });
    }

    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials", status: "ERROR" });
    } else if (!(await bcrypt.compare(password, userDetails.password))) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials", status: "ERROR" });
    }

    const jwtToken = jwt.sign(
      { userID: userDetails._id },
      process.env.TOKEN_SECRET
    );
    res.json({
      message: "Logged In Successfully",
      token: jwtToken,
      name: userDetails?.name,
      status: "SUCCESS",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: "ERROR" });
  }
};

const updateUserData = async (req, res) => {
  try {
    const { name, oldPassword, newPassword } = req.body;
    const userId = req.body.userID;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", status: "ERROR" });
    }

    if (name) {
      user.name = name;
    }

    if (oldPassword && newPassword) {
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid Old Password", status: "ERROR" });
      }
      const hash = await bcrypt.hash(newPassword, saltRounds);
      user.password = hash;
    }

    await user.save();

    res.json({ message: "User data updated successfully", status: "SUCCESS" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: "ERROR" });
  }
};

module.exports = { registerAccount, loginAccount, updateUserData };
