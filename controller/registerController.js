const User = require("../model/user");
const { validateUserRegistration } = require("../utils/validation");
const { HashPassword } = require("../utils/passwordAuth");
const registerUser = async (req, res) => {
  const { fullname, email, userName, password } = req.body;
  const bodyData = {
    fullname,
    userName,
    email,
    password,
  };

  console.log(bodyData);
  try {
    const { error } = validateUserRegistration(bodyData);
    // If validation fails, send an error response with custom error messages
    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({ message: errorMessage });
    }
    //checking to see if user exists already
    const user = await User.findOne({ email }).exec();
    if (user) {
      return res.status(401).json({
        message:
          "Sorry a user with this username already exists. kindly login if this is you",
      });
    }
    const HashedPassword = await HashPassword(password);
    //   creating and saving the data
    const createdUser = await User.create({
        fullname,
        userName,
        email,
        password: HashedPassword,
      });
      
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: createdUser._id,
          fullname: createdUser.fullname,
          userName: createdUser.userName,
          email: createdUser.email,
        },
      });
      
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerUser;
