const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.get("/user", userController.getUser);
router.post("/gold/add", userController.addGold);
router.post("/gold/remove", userController.removeGold);
router.post("/photo", userController.changePhoto);

module.exports = router;
