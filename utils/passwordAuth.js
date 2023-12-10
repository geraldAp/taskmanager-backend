const bcrypt = require("bcrypt");

const HashPassword = async (password) => {
  const saltRound = 10;
  return await bcrypt.hash(password, saltRound);
};

const comparePassword = async (password, validPassword) => {
  const verified = await bcrypt.compare(password, validPassword);
  return verified;
};

module.exports = { HashPassword, comparePassword };
