require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./DB/connect");

const notFound = require("./middleware/notFound");
const errorHandler = require("./Errors/errorHandler");
const authRoute = require("./Routes/authRoute");
const jobRoute = require("./Routes/jobsRoute");

const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Jobs Api ");
});

//Routes
app.use("/api/v1", authRoute);
app.use("/api/v1/job", jobRoute);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
