const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../configs/environment");
const { error } = require("../utils/response");

const checkToken = (req, res, next) => {
  // ambil token dari Header
  const bearerToken = req.header("Authorization");
  // const customHeader = req.header("my-custom-header");
  // console.log(customHeader, bearerToken);
  // via authorization header berbentuk bearer token
  // bearer token
  // verifikasi token
  if (!bearerToken) return error(res, { status: 403, message: "Silahkan Login Terlebih Dahulu" });
  const token = bearerToken.split(" ")[1]; // ["Bearer", "token"]
  jwt.verify(token, jwtSecret, (err, payload) => {
    // jika tidak, maka tolak akses
    if (err && err.name)
      // error jwt
      return error(res, { status: 403, message: err.message });
    if (err)
      // generic error
      return error(res, { status: 500, message: err.message });
    // jika valid, maka lanjut ke controller
    // attach payload ke object request
    req.authInfo = payload;
    next();
  });
};

// const checkRole = (req, res, next) => {
//   next();
// };

module.exports = {
  checkToken,
};
