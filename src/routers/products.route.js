const { Router } = require("express");

const productsController = require("../controllers/products.controller");
const { singleUpload } = require("../middlewares/diskUpload");
const { checkToken } = require("../middlewares/auth");

const productsRouter = Router();

productsRouter.get("/", productsController.getProducts);
// /products/1
// /products/2
productsRouter.get("/:productId", productsController.getProductDetail);
productsRouter.post("/", productsController.insertProducts);
productsRouter.patch(
  "/:productId",
  checkToken,
  singleUpload("image"),
  productsController.patchImageProducts
);

module.exports = productsRouter;
