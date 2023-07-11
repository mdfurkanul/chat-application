const { check, validationResult } = require("express-validator");

const User = require("../../models/People");

const authValidators = [
  check("username")
    .isLength({ min: 5 })
    .withMessage("Mobile/Email is required!"),
  check("password")
    .isLength({
      min: 1,
    })
    .withMessage("Password is required."),
];
const authValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length == 0) {
    next();
  } else {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: mappedErrors,
    });
  }
};

module.exports = { authValidators, authValidationHandler };
