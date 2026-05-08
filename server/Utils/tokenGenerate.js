const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function generateToken(user) {
  const refreshToken = jwt.sign(
    { username: user },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );
  const accessToken = jwt.sign(
    { username: user },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    },
  );

  return { refreshToken, accessToken };
}

module.exports = generateToken;
