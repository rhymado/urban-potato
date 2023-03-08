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

    const limit = parseInt(q.limit) || 5;
    const page = parseInt(q.page) || 1;
    const offset = (page - 1) * limit;

    sql += " LIMIT $1 OFFSET $2";
    const values = [limit, offset];

    db.query(sql, values, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const getMetaProducts = (q) => {
  return new Promise((resolve, reject) => {
    let sql = `select count(*) as total_data from products p`;
    db.query(sql, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      const totalData = parseInt(result.rows[0].total_data);
      const page = parseInt(q.page) || 1;
      const limit = parseInt(q.limit) || 5;
      const totalPage = Math.ceil(totalData / limit);
      let next = ""; // coba dicari
      let prev = ""; // coba dicari
      if (page === 1) prev = null;
      if (page === totalPage) next = null;

      const meta = {
        totalData,
        next,
        prev,
        totalPage,
      };
      resolve(meta);
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
    const sql = "insert into products (name, price) values ($1, $2) RETURNING *";
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
  getMetaProducts,
};
