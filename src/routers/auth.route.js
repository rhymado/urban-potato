const { Router } = require("express");

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth");

const authRouter = Router();

// /auth
// login => post request
authRouter.post("/", authController.login);
// register => post request
authRouter.post("/new", authController.register);
// edit pwd => update request
authRouter.patch("/", authMiddleware.checkToken, authController.editPassword);
// private
authRouter.get("/private", authMiddleware.checkToken, authController.privateAccess);

module.exports = authRouter;
