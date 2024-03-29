const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authModels = require("../models/auth.model");
const { jwtSecret } = require("../configs/environment");
const response = require("../utils/response");

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
    const { id, display_name, password } = result.rows[0];
    // compare password
    const isPasswordValid = await bcrypt.compare(body.password, password);
    if (!isPasswordValid)
      return res.status(401).json({
        msg: "Email/Password Salah",
      });

    const payload = {
      id,
      display_name,
    };
    const jwtOptions = {
      expiresIn: "5m",
    };
    // buat token
    jwt.sign(payload, jwtSecret, jwtOptions, (err, token) => {
      if (err) throw err;
      res.status(200).json({
        msg: "Selamat Datang",
        token,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const register = async (req, res) => {
  const { body } = req;
  try {
    // cek email duplicate
    const verificationResult = await authModels.userVerification(body);
    if (verificationResult.rows.length > 0)
      return response.error(res, { status: 400, message: "Duplicate Email" });

    // hash password
    const hashedPassword = await bcrypt.hash(body.pwd, 10);
    await authModels.createNewUser(body.email, hashedPassword, body.phoneNumber);
    return res.status(500).json({
      msg: "User Created",
    });
  } catch (err) {
    response.error(res, { status: 500, message: "Internal Server Error" });
  }
};

const privateAccess = (req, res) => {
  const { id, email, display_name } = req.authInfo;
  res.status(200).json({
    payload: { id, email, display_name },
    msg: "OK",
  });
};

const editPassword = async (req, res) => {
  // ambil user id => via user id di payload jwt token
  // cek password lama => pwd lama via body
  const { authInfo, body } = req;
  try {
    const result = await authModels.getPassword(authInfo.id);
    const passFromDb = result.rows[0].password;
    // jika tidak valid, maka di tolak
    // if (body.oldPassword !== passFromDb)
    //   return res.status(403).json({
    //     msg: "Password Lama Salah",
    //   });
    const isPasswordValid = await bcrypt.compare(body.oldPassword, passFromDb);
    if (!isPasswordValid)
      return res.status(403).json({
        msg: "Password Lama Salah",
      });
    // jika valid, maka edit password
    // enkripsi password baru
    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
    await authModels.editPassword(hashedPassword, authInfo.id);
    // generate new token
    res.status(200).json({
      msg: "Edit Password Success",
      //   token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

// const forgotPassword = (req, res) => {};

module.exports = { login, privateAccess, editPassword, register };
