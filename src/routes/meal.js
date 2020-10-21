const express = require("express");
const router = express.Router();
const multer = require("multer");
const helper = require("../helpers/helper");
const createError = require("http-errors");
const jwt = require("../helpers/jwt_helper");
const MealController = require("../controller/meal");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, helper.randomN0Gen(100000) + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  return file.mimetype === "image/jpeg" || file.mimetype === "image/png"
    ? cb(null, true)
    : cb(null, false);
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  filer: fileFilter,
});

//handle incoming get request for /meals
router.get("/", MealController.getAllMeal);

router.post(
  "/",
  jwt.verifyToken,
  upload.single("mealPicture"),
  MealController.createNewMeal
);
router.get("/:mealID", MealController.getMealByID);

router.patch("/:mealID", jwt.verifyToken, MealController.updateMealByID);

router.delete("/:mealID", jwt.verifyToken, MealController.deleteMealByID);

router.get("*", createError.NotFound);

module.exports = router;
