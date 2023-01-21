const createJob = async (req, res) => {
  try {
    res.send("Create Job");
  } catch (error) {
    console.log(error);
  }
};

const getJob = async (req, res) => {
  try {
    res.send("get all job");
  } catch (error) {
    console.log(error);
  }
};

const updateJob = async (req, res) => {
  try {
    res.send("update job");
  } catch (error) {
    console.log(error);
  }
};

const deleteJob = async (req, res) => {
  try {
    res.send("delete job");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createJob,
  updateJob,
  getJob,
  deleteJob,
};
