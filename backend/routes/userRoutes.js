const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const upload = require("../utils/multer");
const CLIENT_URL = "https://soomy.tn";

const {
  userRegister,
  getUsers,
  sendMessage,
  validate,
  updatePassword,
  updateUser,
  addCredit,
  imageUpload,
  updateBookmarks,
  deleteBookmarks,
  sendResetMail,
  validateMail,
  updatePasswordReset,
  getNumberOfDocumentsByMonth,
  deleteUser
} = require("../controllers/userController");
const { body, param } = require("express-validator");
userRouter.post(
  "/register",
  body("username").custom((value) => {
    if (!/^[a-z0-9]+$/i.test(value)) {
      throw new Error("The username can contain only letters and numbers.");
    }
    return true;
  }),
  body("email").isEmail().withMessage("Invalid e-mail."),
  body("password")
    .isString()
    .withMessage("Mot de passe doit avoir au moin une lettre.")
    .isLength({ min: 8 })
    .withMessage("Mot de passe doit avoir au moin 8 charactères.")
    .not()
    .isLowercase()
    .withMessage("Mot de passe doit avoir au moin une lettre en majuscule .")
    .not()
    .isUppercase()
    .withMessage("Mot de passe doit avoir au moin une lettre en miniscule.")
    .not()
    .isNumeric()
    .withMessage("Mot de passe doit avoir au moin un nombre.")
    .not()
    .isAlpha()
    .withMessage("Mot de passe invalide."),
  userRegister
);
userRouter.get("/getUsers/:page", getUsers);
userRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
userRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://soomy.tn/signin",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(CLIENT_URL);
  }
);
userRouter.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
userRouter.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "https://soomy.tn/signin",
  }),
  (req, res) => {
    res.redirect(CLIENT_URL);
  }
);

userRouter.post("/login", (req, res, next) => {
  
  passport.authenticate("local", { failureFlash: true }, (err, user, info) => {
    if (err) throw err;
    if (user === "mail")
      return res.status(400).send({ message: "utilisateur introuvable" });
    else if (user === "password")
      return res.status(401).send({ message: "Mot de passe erroné" });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        
        return res
          .status(200)
          .send({
            message: "Successfully Authenticated",
            status: 200,
            user: req.user,
          });
      });
    }
  })(req, res, next);
});
userRouter.get("/user", (req, res) => {
  if (req.user) {
    return res.send({ status: 200, user: req.user, isAuth: true });
  } else
    return res.send({
      status: 401,
      msg: "Not authenticated!",
      isAuth: false,
      user: null,
    }); // The req.user stores the entire user that has been authenticated inside of it.
});
userRouter.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      
      return next(err);
    }
    
    res.status(200).send({ status: 200, msg: "user logged out!" });
  });
});
userRouter.post("/sendMessage", sendMessage);
userRouter.post("/validate", validate);
userRouter.put("/update/:id", updateUser);
userRouter.put(
  "/updatePassword/:id",
  body("newPassword")
    .isString()
    .withMessage("Mot de passe doit avoir au moin une lettre.")
    .isLength({ min: 8 })
    .withMessage("Mot de passe doit avoir au moin 8 charactères.")
    .not()
    .isLowercase()
    .withMessage("Mot de passe doit avoir au moin une lettre en majuscule .")
    .not()
    .isUppercase()
    .withMessage("Mot de passe doit avoir au moin une lettre en miniscule.")
    .not()
    .isNumeric()
    .withMessage("Mot de passe doit avoir au moin un nombre.")
    .not()
    .isAlpha()
    .withMessage("Mot de passe invalide."),
  updatePassword
);
userRouter.put("/image/:id", upload.single("image"), imageUpload);
userRouter.put("/updateBookmarks/:id", updateBookmarks);
userRouter.put("/deleteBookmarks/:id", deleteBookmarks);
userRouter.post("/createCredit", addCredit);
userRouter.get("/getNumberOfDocumentsByMonth", getNumberOfDocumentsByMonth);
userRouter.get("/getemail/:email", sendResetMail);
userRouter.get("/validateemail/:code/:id", validateMail);
userRouter.delete("/deleteUser/:id", deleteUser);
userRouter.get(
  "/updatePasswordReset/:newPassword/:id",
  param("newPassword")
    .isString()
    .withMessage("Mot de passe doit avoir au moin une lettre.")
    .isLength({ min: 8 })
    .withMessage("Mot de passe doit avoir au moin 8 charactères.")
    .not()
    .isLowercase()
    .withMessage("Mot de passe doit avoir au moin une lettre en majuscule .")
    .not()
    .isUppercase()
    .withMessage("Mot de passe doit avoir au moin une lettre en miniscule.")
    .not()
    .isNumeric()
    .withMessage("Mot de passe doit avoir au moin un nombre.")
    .not()
    .isAlpha()
    .withMessage("Mot de passe invalide."),
  updatePasswordReset
);
module.exports = userRouter;
