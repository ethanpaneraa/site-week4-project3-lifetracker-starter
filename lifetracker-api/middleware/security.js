const jwt = require("jsonwebtoken"); 
const { SECRET_KEY } = require("../config");
const { UnAuthorizedError } = require("../utils/errors");

// extract the JWT from the request header
const jwtFrom = ({ headers }) => {
    if (headers?.authorization) {
      const [scheme, token] = headers.authorization.split(" ");
      if (scheme.trim() === "Bearer") {
        return token;
      }
    }
  
    return undefined;
  };

  // create a token for a user
  const extractUserFromJwt = (req,res,next) => {
    try {
        const token = jwtFrom(req);
        if(token) {
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }

        return next()
    } catch(error) {
        return next(error)
    }
}

// make sure the user is logged in - Authenticated
const requireAuthenticatedUser = (req, res, next) => {
    try {
      const { user } = res.locals;
  
      if (!user?.email) {
        throw new UnauthorizedError();
      }
  
      return next();
    } catch (err) {
      return next(err);
    }
  };

  module.exports = {
        extractUserFromJwt,
        requireAuthenticatedUser,
        jwtFrom
  }