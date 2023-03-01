const db = require("../configs/postgre");

const getProducts = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from products", (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

module.exports = {
  getProducts,
};
