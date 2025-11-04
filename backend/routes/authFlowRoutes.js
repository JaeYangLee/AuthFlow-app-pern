const authFlowController = require("../controller/authFlowController");
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router.post("/register", authFlowController.createUser);
router.post("/login", authFlowController.logInUser);
router.get("/profile", verifyToken, authFlowController.getUserProfile);

module.exports = router;
