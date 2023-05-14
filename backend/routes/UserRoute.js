const {
  addUser,
  getLoggedInUser,
  searchUser,
  updateUser,
  getPrices,
  setStripeSession,
} = require("../controller/UserController");
const router = require("express").Router();

router.get("/getLoggedInUser", getLoggedInUser);
router.get("/prices", getPrices);
router.post("/setStripeSession", setStripeSession);
router.get("/search", searchUser);
router.put("/:userId", updateUser);
module.exports = router;
