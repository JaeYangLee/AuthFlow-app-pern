const authFlowController = require("../controller/authFlowController");
const express = require("express");
const router = express.Router();

router.post("/register", authFlowController.createUser);
router.get("/login", authFlowController.logInUser);

module.exports = router;
