const { Router } = require("express");

const productsController = require("../controllers/products.controller");

const productsRouter = Router();

productsRouter.get("/", productsController.getProducts);
// /products/1
// /products/2
productsRouter.get("/:productId", productsController.getProductDetail);
productsRouter.post("/", productsController.insertProducts);

module.exports = productsRouter;
