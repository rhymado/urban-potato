const { Router } = require("express");

const welcomeController = require("../controllers/welcome.controller");
const memoryUpload = require("../middlewares/memoryUpload");

const welcomeRouter = Router();

// localhost/
welcomeRouter.get("/", welcomeController.welcomePage);

welcomeRouter.post("/", memoryUpload.single("image"), welcomeController.cloudUpload);

module.exports = welcomeRouter;
