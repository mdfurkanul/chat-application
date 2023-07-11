const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const User = require("../models/People");

function getLogin(req, res, next) {
  res.render("index");
}
async function userAuthentication(req, res, next) {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };
        const token = jwt.sign(userObject, process.env.JWT_SECRATE, {
          expiresIn: process.env.JWT_EXPIRED,
        });
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRED,
          httpOnly: true,
          signed: true,
        });
        res.locals.loggedInUser = userObject;
        res.render("inbox/index");
      } else {
        throw createError("Login failed! Please try again");
      }
    } else {
      throw createError("Login failed! Please try again");
    }
  } catch (error) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
}
function logOutUser(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("Logged Out.");
}

module.exports = {
  getLogin,
  userAuthentication,
  logOutUser,
};
