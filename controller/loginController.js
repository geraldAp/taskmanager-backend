const jwt = require("jsonwebtoken");

const User = require("../model/user");
const { validateLoginData } = require("../utils/validation");
const { comparePassword } = require("../utils/passwordAuth");
const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const validation = validateLoginData(userName, password);
    if (validation.error) {
      const errorMessage = validation.error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    // checking to see whether a user with this  email exists in the database or not
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({
        message: "Sorry a user with this username does not exist",
      });
    }
    const verified = await comparePassword( password, user.password);
    if (!verified) {
      return res.status(401).json({
        message:
          "UserName or password is incorrect please enter correct email or password",
      });
    } else {
      // User is authenticated, generate access and refresh tokens
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).json({
        message: "login Successful",
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = loginUser;
