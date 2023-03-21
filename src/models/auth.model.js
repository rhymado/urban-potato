const db = require("../configs/postgre");

const userVerification = (body) => {
  return new Promise((resolve, reject) => {
    // verifikasi ke db
    const sql = "SELECT id, display_name, password FROM users WHERE email=$1";
    db.query(sql, [body.email], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const createNewUser = (email, pwd, phone) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO users (email, password, phone_number) VALUES ($1, $2, $3)";
    db.query(sql, [email, pwd, phone], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getPassword = (userId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT u.password FROM users u WHERE id = $1";
    db.query(sql, [userId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const editPassword = (newPassword, userId) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE users SET password = $1 WHERE id = $2";
    db.query(sql, [newPassword, userId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = { userVerification, getPassword, editPassword, createNewUser };
