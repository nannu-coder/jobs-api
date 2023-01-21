const CustomAPIError = require("./customErrorApi");
const { StatusCodes } = require("http-status-codes");

class unAuthorized extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = unAuthorized;
