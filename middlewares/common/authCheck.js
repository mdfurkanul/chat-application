const jwt = require("jsonwebtoken");

const authCheck = (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    try {
      let token = cookies[process.env.COOKIE_NAME];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRATE);
      req.user = decodedToken;

      if (res.locals.html) {
        res.locals.loggedInUser = decodedToken;
      }
      next();
    } catch (error) {
      if (res.locals.html) {
        res.redirect("/");
      } else {
        res.status(500).json({
          errors: {
            common: {
              msg: "Authentication failed",
            },
          },
        });
      }
    }
  } else {
    if (res.locals.html) {
      res.redirect("/");
    } else {
      res.status(500).json({
        errors: {
          common: {
            msg: "Authentication failed",
          },
        },
      });
    }
  }
};
const authRedirect = (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (!cookies) {
    next();
  } else {
    res.redirect("/inbox");
  }
};

module.exports = { authCheck, authRedirect };
