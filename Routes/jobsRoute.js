const router = require("express").Router();
const {
  createJob,
  deleteJob,
  getJob,
  updateJob,
  getSingleJob,
} = require("../Controllers/jobController");

router.route("/").post(createJob).get(getJob);
router.route("/:id").patch(updateJob).delete(deleteJob).get(getSingleJob);

module.exports = router;
