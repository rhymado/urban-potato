// URL = PROTOCOL://HOST:PORT/ENDPOINT
// PROTOCOL = http, https
// HOST = ip, domain
// PORT = ketika ip ada port
// ENDPOINT = alat navigasi
const { Router } = require("express");
// welcome /
const welcomeRouter = require("./welcome.route");
// users /users
const usersRouter = require("./users.route");
const productsRouter = require("./products.route");
const authRouter = require("./auth.route");
const transactionRouter = require("./transactions.route");
const commentsRouter = require("./comments.route");

const masterRouter = Router();

masterRouter.use("/users", usersRouter);
masterRouter.use("/products", productsRouter);
masterRouter.use("/auth", authRouter);
masterRouter.use("/transactions", transactionRouter);
masterRouter.use("/comments", commentsRouter);

masterRouter.use("/", welcomeRouter);

module.exports = masterRouter;
