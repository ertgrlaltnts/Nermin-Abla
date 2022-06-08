const express = require("express");
const fortuneController = require("../controllers/fortuneController");
const router = express.Router();

router.post("/", fortuneController.createFortune);
router.get("/", fortuneController.responseFortune);
router.get("/responses", fortuneController.onlyResponses);
router.post("/delete", fortuneController.deleteFortune);
router.post("/visible", fortuneController.nonVisible);

module.exports = router;
