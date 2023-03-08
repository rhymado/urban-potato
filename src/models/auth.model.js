const db = require("../configs/postgre");

const userVerification = (body) => {
  return new Promise((resolve, reject) => {
    // verifikasi ke db
    const sql =
      "SELECT id, email, display_name FROM users WHERE email=$1 AND password=$2";
    db.query(sql, [body.email, body.password], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = { userVerification };
