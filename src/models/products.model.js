const db = require("../configs/postgre");

const getProducts = (q) => {
  return new Promise((resolve, reject) => {
    let sql = `select p.id, p.name AS product, p.price, c.name AS category from products p 
    join categories c on p.category_id = c.id ORDER BY `;
    let order = "id ASC";
    if (q.order === "cheapest") {
      order = "price ASC";
    }
    if (q.order === "priciest") {
      order = "price DESC";
    }
    sql += order;

    db.query(sql, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const getProductDetail = (p) => {
  return new Promise((resolve, reject) => {
    const sql = "select * from products WHERE id = $1";
    const values = [p.productId];
    db.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const insertProducts = (data) => {
  return new Promise((resolve, reject) => {
    const sql =
      "insert into products (name, price) values ($1, $2) RETURNING *";
    // parameterized query
    const values = [data.name, data.price];
    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  getProducts,
  insertProducts,
  getProductDetail,
};
