/* Section to require some depencies to this code. */
const AppError = require("../utils/AppError");
const { verify } = require("jsonwebtoken");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  /* This const is responsible to get the token itself. */
  const authHeader = request.headers.authorization;

  /* It verifies if the token exists. If not it will throw a new Error. */
  if (!authHeader) {
    throw new AppError("JWT Token não informado.", 401);
  }

  /* If the token exists, you will delete the Bare string and put the token in the first position of the array. */
  const [, token] = authHeader.split(" ");

  /* Verifying if the token is actually valid. */
  try {
    /* You are setting an allie to sub which will contain the user_id. */
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    throw new AppError("JWT Token inválido.", 401);
  }
}

module.exports = ensureAuthenticated;
