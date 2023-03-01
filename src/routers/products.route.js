const { Router } = require("express");
const db = require("../configs/postgre");

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const result = await db.query("select * from products");
    res.status(200).json({
      data: result.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

module.exports = productsRouter;