require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

//Paths
const connect = require("./DB/connect");
const notFound = require("./middleware/notFound");
const errorHandler = require("./Errors/errorHandler");
const authRoute = require("./Routes/authRoute");
const jobRoute = require("./Routes/jobsRoute");
const authenticateRoute = require("./middleware/authentication");

const port = process.env.PORT || 5000;

//middleware
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.use(express.static("./pulic"));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

app.get("/", (req, res) => {
  res.send("Jobs Api ");
});

//Routes
app.use("/api/v1", authRoute);
app.use("/api/v1/job", authenticateRoute, jobRoute);

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
