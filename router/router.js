const express = require("express");
const router = express.Router();
const { signup, login, getTask } = require("../controllers/controller");

router.post("/signup", signup);
router.post("/login", login);
router.route("/api").post(getTask);

module.exports = router;
