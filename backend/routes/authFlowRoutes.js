const authFlowController = require("../controller/authFlowController");
const express = require("express");
const router = express.Router();

router.get("/email/:email", authFlowController.findUserByEmail);
router.get("/username/:username", authFlowController.findUserByUsername);
router.post("/", authFlowController.createUser);
router.put("/:user_id", authFlowController.updateUser);
router.delete("/:user_id", authFlowController.deleteUser);

module.exports = router;
