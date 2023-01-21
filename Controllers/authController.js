const User = require("../Schemas/userSchema");
const { StatusCodes } = require("http-status-codes");
const badRequestError = require("../Errors/badRequest");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  try {
    res.send("login user");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
};
