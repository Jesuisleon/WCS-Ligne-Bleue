const express = require("express");
const {
  hashPassword,
  verifyPassword,
  // verifyToken,
} = require("./middleware/auth");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const tutorialControllers = require("./controllers/tutorialControllers");
const themeControllers = require("./controllers/themeControllers");

router.get("/home", themeControllers.browse);

router.get("/tutorials", tutorialControllers.browse);
router.get("/tutorials/:id", tutorialControllers.read);
router.put("/tutorials/:id", tutorialControllers.edit);
router.post("/tutorials", tutorialControllers.add);
router.delete("/tutorials/:id", tutorialControllers.destroy);

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", hashPassword, userControllers.add);
router.post(
  "/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

module.exports = router;
