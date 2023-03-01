const usersModel = require("../models/users.model");

const getUsers = (req, res) => {
  usersModel
    .getUsers()
    .then((result) => {
      res.status(200).json({
        data: result.rows,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    });
};

module.exports = {
  getUsers,
};
