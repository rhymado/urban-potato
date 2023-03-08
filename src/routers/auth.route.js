const { Router } = require("express");

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth");

const authRouter = Router();

// /auth
// login => post request
authRouter.post("/", authController.login);
// private
authRouter.get("/private", authMiddleware.checkToken, authController.privateAccess);

module.exports = authRouter;
