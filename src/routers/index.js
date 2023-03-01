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

const masterRouter = Router();

masterRouter.use("/", welcomeRouter);
masterRouter.use("/users", usersRouter);
masterRouter.use("/products", productsRouter);

module.exports = masterRouter;
