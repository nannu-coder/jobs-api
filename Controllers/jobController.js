const Job = require("../Schemas/jobSchema");
const { StatusCodes } = require("http-status-codes");
const unAuthorized = require("../Errors/unAuthorized");
const notFoundError = require("../Errors/notFoundError");
const badRequestError = require("../Errors/badRequest");

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json(job);
};

const getJob = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort(
    "-createdAt"
  );

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getSingleJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.find({ createdBy: req.user.userId, _id: id });

  if (!job) {
    throw new notFoundError(`No Job found with this id=${id}`);
  }

  res.status(StatusCodes.OK).json(job);
};

const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id },
    body: { company, position },
  } = req;

  if (company === "" || position === "") {
    throw new badRequestError("company and position not be empty");
  }

  const job = await Job.findOneAndUpdate(
    { _id: id, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!job) {
    throw new notFoundError(`No Job Found for this id: ${id}`);
  }

  res.status(StatusCodes.OK).json(job);
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id },
  } = req;

  const job = await Job.findByIdAndRemove({ _id: id, createdBy: userId });

  if (!job) {
    throw new notFoundError(`No Job Found for this id: ${id}`);
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  createJob,
  updateJob,
  getJob,
  deleteJob,
  getSingleJob,
};
