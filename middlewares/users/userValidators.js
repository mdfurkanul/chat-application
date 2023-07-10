const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const { unlink } = require("fs");
const path = require("path");

const User = require("../../models/People");

const addUserValidators = [
  check("name")
    .isLength({ min: 2 })
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name is too long")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contains anything other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email is already use!");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check("mobile")
    .isMobilePhone("any", {
      strictMode: true,
    })
    .withMessage("Mobile Must be valid!")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile is already use!");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should at lest 1 lowesercase, 1 uppercase, 1 number & 1symbol"
    ),
];

const addUserValidatoionHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length == 0) {
    next();
  } else {
    //removed upload files
    if (req.files.length > 0) {
      const { fileName } = req.files[0];
      unlink(
        path.join(__dirname, `/../public/uploads/avatar/${fileName}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addUserValidators,
  addUserValidatoionHandler,
};
