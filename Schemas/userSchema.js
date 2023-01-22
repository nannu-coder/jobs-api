const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      reqired: [true, "Please provice a name"],
      maxLength: 30,
    },

    email: {
      type: String,
      required: [true, "Please provice a email"],
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "Please enter a valid Email",
      ],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please enter a valid Password"],
      minLength: 6,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;

  next();
});

userSchema.methods.createJwt = function () {
  return jwt.sign(
    { name: this.name, userId: this._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
