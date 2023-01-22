const CustomAPIError = require("./customErrorApi");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  //Default Error
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || `Internal server error, Please try again later`,
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }

  if (err && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )}  field`;
    customError.statusCode = 400;
  }

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");

    customError.code = 400;
  }

  if (err.name === "CastError") {
    customError.msg = `No Item found with ID: ${err.value}`;
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json(customError.msg);
};

module.exports = errorHandler;
