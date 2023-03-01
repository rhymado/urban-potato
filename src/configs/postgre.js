const { Pool } = require("pg");
// client
// pool
const db = new Pool({
  host: "localhost",
  database: "kopi_toko",
  port: 5433,
  user: "fakhri",
  password: "fakhri",
  //   connectionString: "postgresql://fakhri:fakhri@localhost:5433/kopi_toko",
});

module.exports = db;
