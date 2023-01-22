const CustomAPIError = require("./customErrorApi");
const { StatusCodes } = require("http-status-codes");
const e = require("express");

class notFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = notFoundError;
