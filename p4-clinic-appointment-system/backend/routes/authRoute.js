const router = require("express").Router();
const { register, login } = require("../controllers/authController.js");
const { requireSignin } = require("../middlewares/authMiddleware.js");

router.post("/register", register);
router.post("/login", login);
// PROTECTED ROUTE
router.get("/me", requireSignin, (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user
    });
});

module.exports = router;
