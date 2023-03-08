const jwt = require("jsonwebtoken");
const authModels = require("../models/auth.model");
const { jwtSecret } = require("../configs/environment");

const login = async (req, res) => {
  try {
    // ambil email dan pwd dari body
    const { body } = req;
    // verifikasi ke db
    const result = await authModels.userVerification(body);
    // jika valid, maka buatkan jwt
    // jika tidak, maka error handling
    if (result.rows.length < 1)
      return res.status(401).json({
        msg: "Email/Password Salah",
      });

    // buat token
    jwt.sign(
      result.rows[0],
      jwtSecret,
      {
        expiresIn: "5m",
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          msg: "Selamat Datang",
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const privateAccess = (req, res) => {
  const { id, email, display_name } = req.authInfo;
  res.status(200).json({
    payload: { id, email, display_name },
    msg: "OK",
  });
};

module.exports = { login, privateAccess };
