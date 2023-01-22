const User = require("../Schemas/userSchema");
const { StatusCodes } = require("http-status-codes");
const badRequest = require("../Errors/badRequest");
const unAuthorized = require("../Errors/unAuthorized");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createJwt();

  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new badRequest("Please provide email and password");
  }

  const user = await User.findOne({ email });
  const isMatchPassword = await user.comparePassword(password);

  if (!isMatchPassword) {
    throw new unAuthorized("Invalid Credentials");
  }

  if (!user) {
    throw new unAuthorized("Invalid Credentials");
  }

  const token = user.createJwt();

  res
    .status(StatusCodes.OK)
    .json({ name: user.name, email: user.email, token });
};

module.exports = {
  register,
  login,
};
