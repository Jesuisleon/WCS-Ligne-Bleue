const express = require("express");
const fs = require("fs");
const uuid = require("uuid");
const multer = require("multer");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyAdmin,
} = require("./middleware/auth");

const upload = multer({
  dest: "upload/image",
});

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const tutorialControllers = require("./controllers/tutorialControllers");
const themeControllers = require("./controllers/themeControllers");

// public routes
router.get("/home", themeControllers.browse);
router.post("/users", hashPassword, userControllers.add);
router.get("/tutorials", tutorialControllers.browse);
router.get("/tutorials/:id", tutorialControllers.read);

router.post(
  "/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// Not public routes
router.use(verifyToken, verifyAdmin); // authentication wall : verifyToken is activated for each route after this line

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.delete("/users/:id", userControllers.destroy);
router.put("/tutorials/:id", tutorialControllers.edit);
router.post("/tutorials", tutorialControllers.add);
router.delete("/tutorials/:id", tutorialControllers.destroy);

router.post("/upload/image", upload.single("image"), (req, res) => {
  const { file } = req;
  if (!file) {
    res.status(400).send("No file was uploaded.");
    return;
  }
  const id = uuid.v4();
  const { originalname } = file;

  // Move the image to the public folder
  fs.rename(file.path, `./public/images/${id}${originalname}`, (err) => {
    if (err) {
      res.status(500).send("There was an error uploading the file.");
      return;
    }
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const imageFolder = "/images/";

    // send the image url back to the client
    res.send({ location: `${baseUrl}${imageFolder}${id}${originalname}` });
  });
});

module.exports = router;
