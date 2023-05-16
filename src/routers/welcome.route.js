const { Router } = require("express");

const welcomeController = require("../controllers/welcome.controller");
const memoryUpload = require("../middlewares/memoryUpload");
// const { checkToken } = require("../middlewares/auth");
const notification = require("../utils/notification");

const welcomeRouter = Router();

// localhost/
welcomeRouter.get("/", welcomeController.welcomePage);

welcomeRouter.post("/", memoryUpload.single("image"), welcomeController.cloudUpload);

welcomeRouter.post("/notification", (req, res) => {
  const { body } = req;
  // ambil token FCM
  console.log(body.token);
  notification
    .send(body.token, {
      title: "Remote",
      body: "From Backend",
    })
    .then(() =>
      res.status(200).json({
        msg: "OK",
      })
    )
    .catch((err) => {
      console.log(err);
    });
});

module.exports = welcomeRouter;
