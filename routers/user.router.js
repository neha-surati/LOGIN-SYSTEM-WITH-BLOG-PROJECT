const { Router } = require("express");
const {
  indexPage,
  loginPage,
  signupPage,
  home,
  signup,
  login,
  uploadImage,
  addblog,
  addblogPage,
  deleteblog,
  editblog,
  updateblog,
  logout,
} = require("../controllers/user.controller");
const { isAuth, userAuth } = require("../middleware/user.auth");
const passport = require("passport");
const router = Router();

//  router.get("/", isAuth, indexPage);
 router.get("/", home);

router.post("/addblog", uploadImage, addblog);
router.get("/addblog", addblogPage);

router.post("/login", login);
router.get("/login", loginPage);

router.post("/signup", userAuth, signup);
router.get("/signup", signupPage);

router.get("/deleteblog/:id", deleteblog);
router.get("/editblog/:id", editblog);

router.post("/updateblog", uploadImage, updateblog);

router.get("/logout", logout);

router.post(
  "/local",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = { router };
